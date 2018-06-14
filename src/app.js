import http        from 'http';
import app         from './config/app';
import usersRoutes from  './routes/users';

const port	= '3000';
const server	= http.createServer(app);


app.use('/users', usersRoutes);

// app.get('/test', (req, res, next) => {
//     Bookshelf.knex('users')
// 	.insert([{email: ''+Math.random(), password:  ''+Math.random()}])
// 	.then(resp => {
// 	    console.log(resp);
// 	    res.json({plop: "TAC", resp});
// 	});
// });

// app.get('/look', (req, res, next) => {
//     Bookshelf.knex.select().table('users')
// 	.then(resp => {
// 	    console.log(resp);
// 	    res.json({plop: "LOOK", resp});
// 	});
// });

server.listen(port);
console.log('server listening on port ' + port);


module.exports = app;
