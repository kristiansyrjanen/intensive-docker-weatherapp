FROM node:10

WORKDIR /frontend

COPY package.json /frontend
RUN npm install
COPY . /frontend

CMD npm start

EXPOSE 8000
