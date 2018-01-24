FROM ubuntu

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y postgresql postgresql-contrib
RUN apt-get install -y redis-server redis-tools
EXPOSE 5432
ADD entrypoint.sh /entrypoint.sh
CMD ["/bin/sh", "entrypoint.sh"]
