#!/bin/sh

until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$DB_HOST" -U "$POSTGRES_USER" -c '\d'; do
    >&2 echo "Postgres is unavailable - sleeping"
    sleep 1
done

>&2 echo "Postgres is up - executing command"

knex migrate:latest
npm i

echo "node env : $NODE_ENV"

if [ "$NODE_ENV" == "production" ] ; then
    npm run start
elif [ "$NODE_ENV" == "test" ] ; then
    echo "AHAHAHAHHAHAHAHHAHAHAHAHAHAHAHAHAHHAHAHAHHAHAHAHAHAHAHAHAHAHHAHAHAHHAHAHAHAHAHAHAHAHAHHAHAHAHHAHAHAHAHAH"
    npm test
    # npm run coverage
else
    npm run dev
fi
