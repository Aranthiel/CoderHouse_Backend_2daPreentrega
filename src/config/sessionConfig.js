import session from 'express-session';
import FileStore from 'session-file-store';
import mongoStore from "connect-mongo";
import config from './config.js';
import { __dirname } from '../utils.js';

const fileStore = FileStore(session);

export const fileSessionConfig = {
    secret: 'SESSIONSECRETKEY',
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    store: new fileStore({
        path: __dirname + '/sessions',
    }),
};


export const mongoSessionConfig = {
    store: new mongoStore({
        mongoUrl: config.mongo_uri 
    }),
    secret: 'mongosessionsecretkey',
    cookie: {
        maxAge: 30000,
    },
}
