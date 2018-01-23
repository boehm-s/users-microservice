FROM ubuntu

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash -
RUN apt-get install -y nodejs
