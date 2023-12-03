import express from 'express';

//variables de enterno
import config from './config/config.js'

// coockie parser
//import cookieParser from "cookie-parser";

// session
//import session from "express-session";
//import FileStore from "session-file-store";
//import mongoStore from "connect-mongo";

//passport
//import passport from 'passport';
//import './passport.js';

//handlebars'
//import { engine } from "express-handlebars";
import { __dirname } from './utils.js';
//import path from 'path';

//mongoose
import "./config/dbConfig.js";

//socket.io 
//import { initializeSocket } from "./socket/socketServer.js";

//routes
import apiRouter from './routes/api.routes.js';
import viewsRouter from './routes/views.routes.js';
import errorRouter from './routes/error.routes.js';

const app = express();
const PORT=config.port;

//Middleware para que Express pueda analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));

// routes
app.use("/api", apiRouter);
app.use("/", viewsRouter);
app.get("*", errorRouter);

// Inicia el servidor
const httpServer = app.listen(PORT, ()=>(
    console.log(`Pruebas server express. Servidor escuchando en http://localhost:${PORT}`)
));