exports.up = function(knex, Promise) {
    return Promise.all([
	knex.schema.createTable('roles', table => {
	    table.increments('id').primary();
	    table.string('name').unique();
	}).then(() => knex('roles').insert([
	    {name: 'user'},     // 1
	    {name: 'manager'}   // 2
	])),
	knex.schema.createTable('users', table => {
	    table.increments('id').primary();
	    table.string('email').unique();
	    table.string('password');
	    table.integer('role').unsigned().defaultTo(1);
	    table.foreign('role').references('roles.id');
	})
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
	knex.schema.dropTable('users'),
	knex.schema.dropTable('roles')
    ]);
};
