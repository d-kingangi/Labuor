FROM node:18.16.0

COPY package*.json ./

EXPOSE 4200 8080

RUN npm install -g @angular/cli

RUN npm install --only=production

COPY . ./

RUN ng serve

CMD ["node", "server.js"]
