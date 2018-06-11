#!/bin/sh

until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$DB_HOST" -U "$POSTGRES_USER" -c '\d'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"

knex migrate:latest
npm i
if [ "$NODE_ENV" == "production" ] ; then
  npm run start
else
  npm run dev
fi
