# intensive-docker-weatherapp
Task for Eficodes intensive Docker course.


## Getting started

Vagrant file by Eficode, added additional port-forwading to ports 8000 & 8888.

Finish up the files regarding weatherapp, e.g. add API-key, get the thing to run and add your own feature.


Getting the thing to run was a pain in the ass. Kept giving TypeErrors and icons where not showing up. Noticed that the frontend/src/index.jsx and the webpack-dev-server was having a hard time understanding the { baseurl } variable, so I needed to change it to http://localhost:8000/api/weather so that it would work.

### Feature

My feature was to add temperature (in Celsius) and location information (city, country).

This was made by adding 3 new constructor/states whatever their called to the frontend index.jsx. It shows the given parameters from the JSON that we got through the API call. Below you can see the slight modifications.

    ##########################################
        this.state = {
          icon: "",
          temperature: "",
          location_city: "",
          location_country: "",
        };
      }
    ###########################################
        this.setState({icon: response.weather[0].icon.slice(0, -1),temperature: response.main.temp,location_city: response.name,location_country: response.sys.country});
      }
    ###########################################
      render() {
        const { icon } = this.state;
        const { temperature } = this.state;
        const { location_city } = this.state;
        const { location_country } = this.state;
    ###########################################


### Testing that the application was running

After finishing the needed files, run in respective directories:

    cd /home/vagrant/weatherapp/backend/
    npm i && npm start &
    
    cd /home/vagrant/weatherapp/frontend/
    npm i && npm start &
    
Head to localhost:8000 to see that the app is running and showing correct information and icon.

![alt text](https://i.imgur.com/hgABdfT.png)

All gucci.

### Building the images

Build docker images in respective directory

    cd /home/vagrant/weatherapp/backend/
    docker build -t backend .
    
    cd /home/vagrant/weatherapp/frontend/
    docker build -t frontend .

### Running the images in docker

To test out our images, run:

    docker container run --name backend -p 8888:8888 backend
    
    docker container run --name frontend -p 8000:8000 frontend
    
They spin up and still show the same as before, great!

### Creating the docker-compose file

Create your docker-compose.yaml file based off of your Dockerfiles at the root of your project.

    version: '3'
    
    services:

      front_end:
        build:
          context: ./frontend/
        ports:
          - "8000:8000"
        expose:
          - "8000"

      back_end:
        build:
          context: ./backend/
        ports:
          - "8888:8888"
        expose:
          - "8888"

This is how mine turned out to look like.

Now go ahead and run:

    docker-compose up -d
    
It will start building it's own images of the parameters we've set up in the YAML file.

Works like a charm! Next...


## Minikube setup and deployment

### Setting up Minikube

Install kubernetes,

    curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
    sudo touch /etc/apt/sources.list.d/kubernetes.list
    echo "deb http://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
    sudo apt-get update
    sudo apt-get install -y kubectl socat

Start minikube

    sudo minikube start --vm-driver=none
        
Access dashboard

    sudo minikube dashboard

ctrl+c when you see https://....

    nohup kubectl port-forward  -n kubernetes-dashboard service/kubernetes-dashboard --address 0.0.0.0 9000:80 > dashboard.log &

### DEPLOYMENT

Time for the finale, to deploy on Minikube

    ## BACKEND
    kubectl run weatherapp-backend --image=backend:latest --image-pull-policy=Never
    kubectl expose deployment weatherapp-backend --type=NodePort --port 8888
    nohup kubectl port-forward service/weatherapp-backend --address 0.0.0.0 8888:8888 > backend.log &

    ##FRONTEND
    kubectl run weatherapp-frontend --image=frontend:latest --image-pull-policy=Never
    kubectl expose deployment weatherapp-frontend --type=NodePort --port 8000
    nohup kubectl port-forward service/weatherapp-frontend --address 0.0.0.0 8000:8000 > frontend.log &

![Alt text](https://i.imgur.com/9vOjYfl.gif)

So that's it.
