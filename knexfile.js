module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            host: process.env.HOST || '127.0.0.1',
            port: process.env.DATABASE_PORT || '8888',
            database: process.env.DB_NAME || 'users-boilerplate',
            user:     process.env.DB_USER || 'users-boilerplate',
            password: process.env.DB_PASS || 'users-boilerplate'
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
            host: process.env.HOST || '127.0.0.1',
            database: process.env.DB_NAME || 'users-boilerplate',
            user:     process.env.DB_USER || 'users-boilerplate',
            password: process.env.DB_PASS || 'users-boilerplate'
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
