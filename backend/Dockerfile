# Use the Node.js 18.16.0
FROM node:18.16.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./dist .

EXPOSE 3000

CMD ["node", "server.js"]
