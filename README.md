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
postgres@hostname:~$ createuser test
postgres@hostname:~$ createdb test
postgres@hostname:~$ psql
postgres=# ALTER USER test WITH ENCRYPTED PASSWORD 'test';
ALTER ROLE
postgres=# GRANT ALL PRIVILEGES ON DATABASE test TO test;
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
