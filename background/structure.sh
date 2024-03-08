#!/bin/bash

npm init 

tsc --init

npm install express

echo "node_modules/"  >> .gitignore

touch .env

echo ".env/"  >> .gitignore

touch .gitignore

mkdir src

cd src

touch server.ts

mkdir Config Helpers Intefaces MailServices Templates

cd Config 

touch sql.config.ts

cd ..