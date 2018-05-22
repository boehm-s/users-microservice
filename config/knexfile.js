module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            host: process.env.DB_HOST || 'localhost',
            port: process.env.POSTGRES_PORT || '15432',
            database: process.env.POSTGRES_DB || 'users-microservice',
            user:     process.env.POSTGRES_USER || 'postgres',
            password: process.env.POSTGRES_PASSWORD || 'postgres'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },
    production: {
        client: 'postgresql',
        connection: {
            host: process.env.DB_HOST || '127.0.0.1',
            port: process.env.POSTGRES_PORT || '15432',
            database: process.env.POSTGRES_DB || 'users-microservice',
            user:     process.env.POSTGRES_USER || 'postgres',
            password: process.env.POSTGRES_PASSWORD || 'postgres'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
};
