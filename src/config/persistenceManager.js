import config from './config.js';
//mongo daos
import {ProductsMongo}  from '../dao/mongo_dao/products.mongo.js';
import {UsersMongo}  from '../dao/mongo_dao/users.mongo.js';
import {CartsMongo}  from '../dao/mongo_dao/carts.mongo.js';
// fs daos
import {ProductsFS} from '../dao/fileSistem_dao/products.fs.js'
import {UsersFS} from '../dao/fileSistem_dao/users.fs.js'
import {CartsFS} from '../dao/fileSistem_dao/carts.fs.js';

//session
import { fileSessionConfig, mongoSessionConfig } from  './sessionConfig.js';
//winston 
import {myCustomLogger} from './configWinston.js'


const persistencia = config.persistencia;
let mySession; 


let productsPersistence;
let usersPersistence;
let cartsPersistence;

if(persistencia==='mongo'){
    productsPersistence = new ProductsMongo();
    usersPersistence = new UsersMongo();
    cartsPersistence = new CartsMongo();
    mySession = mongoSessionConfig;
} else {
    productsPersistence = new ProductsFS('productos.json');
    usersPersistence = new UsersFS('usuarios.json');
    cartsPersistence = new CartsFS('carritos.json');
    mySession = fileSessionConfig;
    myCustomLogger.test(`Has seleccionado la presistencia en ${persistencia}. si no existen los archivos .json a veces da un error y no los crea, se soliciona si los creas manualmente
    `)
}


export {
    productsPersistence,
    usersPersistence,
    cartsPersistence,
    mySession
}

