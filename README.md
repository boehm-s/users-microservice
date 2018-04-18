# Users microservice Node / Express / PostgreSQL / Redis

## getting PostgreSQL and Redis from Docker


```
docker build . -t users-microservice
docker run -it users-microservice
```



Configure database :

```
postgres@hostname:~$ createuser adwords
postgres@hostname:~$ createdb adwords
postgres@hostname:~$ psql
postgres=# ALTER USER adwords WITH ENCRYPTED PASSWORD 'adwords';
ALTER ROLE
postgres=# GRANT ALL PRIVILEGES ON DATABASE adwords TO adwords;
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

### notes for me

create a docker for the PostgreSQL DB, then find something like interfaces in node to do some kind of "socket" between the data source and the API
