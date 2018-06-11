module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST || 'localhost',
            port: process.env.POSTGRES_PORT || '5432',
            database: process.env.POSTGRES_DB || 'users-microservice',
            user:     process.env.POSTGRES_USER || 'postgres',
            password: process.env.POSTGRES_PASSWORD || 'postgres',
	    charset  : 'utf8'
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
        client: 'pg',
        connection: {
            host: process.env.DB_HOST || 'localhost',
            port: process.env.POSTGRES_PORT || '5432',
            database: process.env.POSTGRES_DB || 'users-microservice',
            user:     process.env.POSTGRES_USER || 'postgres',
            password: process.env.POSTGRES_PASSWORD || 'postgres',
	    charset  : 'utf8'
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
