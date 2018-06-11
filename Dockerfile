FROM node:10.1-alpine
RUN apk --update add redis postgresql-client
EXPOSE 3000 9229 15432
COPY . /home/app
WORKDIR /home/app
RUN npm install
RUN npm install -g knex
CMD ./scripts/start.sh
