# adwords project

## Install dev environment

You need : `NodeJS`, `npm`, and `PostgreSQL` latest stable versions, a postgres user.
Install node dependencies and tools required for this project :

```
npm i
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
