FROM node:10.1-alpine
EXPOSE 3000 9229 15432
COPY . /home/app
WORKDIR /home/app
RUN npm install
CMD ./scripts/start.sh
