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
	}),
	knex('users').insert({
            email: 'boehm_s@seed-up.io',
            password: '$2a$10$oCZ6TX4WG/NSmys9E/0x7OfEMSqM6TxbtnvzEB5Af8KhEBB3K0Rci', // my cat's name
            role: 2
        })

    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
	knex.schema.dropTable('users'),
	knex.schema.dropTable('roles')
    ]);
};
