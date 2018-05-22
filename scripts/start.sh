#!/bin/sh

npm install
ls
node_modules/.bin/knex migrate:latest --knexfile config/knexfile.js --cwd .
if [ "$NODE_ENV" == "production" ] ; then
  npm run start
else
  npm run dev
fi
