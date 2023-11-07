# Dockerfile
FROM node:14

RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY wait-for-database.sh /usr/wait-for-database.sh
RUN chmod +x /usr/wait-for-database.sh

CMD [ "node", "run", "start" ]