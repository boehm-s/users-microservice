# Users microservice Node / Express / PostgreSQL / Redis

## getting PostgreSQL and Redis from Docker

Choosing ports :

 - Redis: 7777
 - PostgreSQL: 8888


```
docker build . -t users-microservice
docker run -it -p 7777:6379 -p 8888:5432 users-microservice:latest
```


Configure database :

```
postgres@hostname:~$ createuser um
postgres@hostname:~$ createdb um
postgres@hostname:~$ psql
postgres=# ALTER USER um WITH ENCRYPTED PASSWORD 'um';
ALTER ROLE
postgres=# GRANT ALL PRIVILEGES ON DATABASE um TO um;
GRANT
postgres@hostname:~$
```

Once the database configured, run the migrations :

```
knex migrate:latest
```

Check if everything is alright :
```
npm test
```
