import program from "./commander.js";
//mongo daos
import {ProductsMongo}  from '../dao/mongo_dao/products.mongo.js';
import {UsersMongo}  from '../dao/mongo_dao/users.mongo.js';
import {CartsMongo}  from '../dao/mongo_dao/carts.mongo.js';
// fs daos
import {ProductsFS} from '../dao/fileSistem_dao/products.fs.js'
import {UsersFS} from '../dao/fileSistem_dao/users.fs.js'

const persistencia = program.opts().db;


let productsPersistence;
let usersPersistence;
let cartsPersistence;

if(persistencia==='mongo'){
    productsPersistence = new ProductsMongo();
    usersPersistence = new UsersMongo();
    cartsPersistence = new CartsMongo();
} else {
    productsPersistence = new ProductsFS('productos.json');
    usersPersistence = new UsersFS('usuarios.json');
    //cartsPersistence = new CartsFS();
}
console.log(
    'productsPersistence', productsPersistence, 
    'usersPersistence', usersPersistence, 
    'cartsPersistence', cartsPersistence
    )

export {
    productsPersistence,
    usersPersistence,
    cartsPersistence
}

