FROM ubuntu

RUN apt-get update && apt-get upgrade -y
# RUN curl -sL https://deb.nodesource.com/setup_9.x | bash -
# RUN apt-get install -y nodejs
RUN apt-get install -y postgresql postgresql-contrib
RUN apt-get install -y redis-server redis-tools
# PostgreSQL
EXPOSE 5432
# Redis
EXPOSE 6379

ADD entrypoint.sh /entrypoint.sh
CMD ["/bin/sh", "entrypoint.sh"]
