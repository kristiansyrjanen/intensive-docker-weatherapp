FROM node:10

WORKDIR /backend

COPY package.json /backend
RUN npm install
COPY . /backend

CMD npm start

EXPOSE 8888
