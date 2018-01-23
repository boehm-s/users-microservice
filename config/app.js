import express		from 'express';
import session          from 'express-session';
import bodyParser	from 'body-parser';
import logger		from 'morgan';
import cookieParser	from 'cookie-parser';
import path		from 'path';
import sass		from 'node-sass-middleware';
import RedisStore       from 'connect-redis';
import client           from './redis';

import {
    conf as passportConf,
    passport}           from './passport';

const redisStore = RedisStore(session);
const app	 = express();
const frontRoot  = `${__dirname}/../FRONT/`;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(frontRoot, 'public')));
app.use(cookieParser(passportConf.secret));
app.use(sass({
    src: path.join(frontRoot, 'public/sass'),
    dest: path.join(frontRoot, 'public/css'),
    indentedSyntax: true,
    sourceMap: true
}));



app.set('views', path.join(frontRoot, 'views'));
app.set('view engine', 'pug');


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

  next();
});

app.use(session({
    store: new redisStore({
	// host: passportConf.redis.host,
	// port: passportConf.redis.port,
	client
    }),
    secret: passportConf.secret,
    cookie : {
	expires: false,
	secure: false,
	httpOnly: false,
	maxAge: 60000000
    },
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

export default app;
