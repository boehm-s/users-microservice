import path         from 'path';
import http         from 'http';
import express      from 'express';
import bodyParser   from 'body-parser';
import cookieParser from 'cookie-parser';
import pino         from 'pino';
import pinoExpress  from 'express-pino-logger';
import passport     from 'passport';
import passportJWT  from 'passport-jwt';
import swaggerUi    from 'swagger-ui-express';
import YAML         from 'yamljs';

import usersRoutes  from './routes/users';

const PORT   = process.env.PORT || 3000;
const app    = express();
const server = http.createServer(app);

// setup parsers
app.use(cookieParser());
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));

// setup pino logger
const logger  = pino();
app.use(pinoExpress());

// api documentation
const docPath = path.join(__dirname, '..', 'doc.yml');
const swaggerDocument = YAML.load(docPath);
app.use(['/documentation', '/doc'], swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.use('/users', usersRoutes);


app.get('/health-check', (_req, res) => {
    res.json({success: true});
});

// http://www.marcusoft.net/2015/10/eaddrinuse-when-watching-tests-with-mocha-and-supertest.html
if (!module.parent){
    server.listen(PORT, _ => logger.info(`server listening on port ${PORT}`));
}
module.exports = app;
