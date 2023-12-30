import express from 'express';

//variables de enterno
import config from './config/config.js'

// coockie parser
import cookieParser from "cookie-parser";

// session
import session from "express-session";
import {mySession}from './config/persistenceManager.js';

//passport
import passport from 'passport';
import './config/passportInitialize.js';

//handlebars'
import { engine } from "express-handlebars";
import { __dirname } from './utils.js';
import path from 'path';

//mongoose
import "./config/dbConfig.js";

//socket.io 
import { initializeSocket } from "./socket/socketServer.js";

//routes
import apiRouter from './routes/api.routes.js';
import viewsRouter from './routes/views.routes.js';
import errorRouter from './routes/error.routes.js';

//winston
import { logger, myCustomLogger} from './config/configWinston.js';


const app = express();
const PORT=config.port;

//Middleware para que Express pueda analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));

// session
//SIEMPRE tiene que estar declarado antes de routes para que funcione correctamente!
app.use(session(mySession));

//passport 
//SIEMPRE tiene que estar declarado desppues de session para que funcione correctamente!
app.use(passport.initialize());
app.use(passport.session());

//handlebars
app.engine("handlebars", engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

// Parsear las cookies
app.use(cookieParser());

// routes
app.use("/api", apiRouter);
app.use("/", viewsRouter);
//app.get("*", errorRouter);


//custom levels
myCustomLogger.fatal('probando winston fatal')
myCustomLogger.error('probando winston error')
myCustomLogger.warning('probando winston warning')
myCustomLogger.info('probando winston info')
myCustomLogger.http('probando winston http')
myCustomLogger.debug('probando winston debug')
myCustomLogger.test('probando winston test')


// Inicia el servidor
const httpServer = app.listen(PORT, ()=>(
    myCustomLogger.info(`Pruebas server express. Servidor escuchando en http://localhost:${PORT}/home `)
));

//const socketServer = new Server(httpServer);
initializeSocket(httpServer);  