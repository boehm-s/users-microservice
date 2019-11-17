const bcrypt = require('bcrypt');
const passwd = bcrypt.hashSync('passw0rd', 10);

exports.up = function(knex) {
    return knex.schema.createTable('role', table => {                     /* create role table */
        table.increments().primary();
        table.string('authority', 100).unique().notNullable();
    }).then(_ => Promise.all([                                            /* create USER and ADMIN roles */
        knex('role').insert({authority: 'USER'}),
        knex('role').insert({authority: 'ADMIN'})
    ])).then(_ => knex.schema.createTable('user', table => {              /* create user table */
        table.increments().primary();
        table.string('email', 100).unique().notNullable();
        table.string('password', 200).notNullable();
        table.integer('role_id').unsigned().notNullable().references('role.id').onDelete('CASCADE').defaultTo(1);
    })).then(_ => Promise.all([
        knex('user').insert({email: 'steven.boehm.dev@gmail.com', password: passwd, role_id: 2}),
        knex('user').insert({email: 'test@mail.net', password: passwd, role_id: 1})
    ]));
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('user')
        .dropTable('role');
};
