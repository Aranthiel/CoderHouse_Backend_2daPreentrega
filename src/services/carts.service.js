//import {cartsMongo} from '../dao/mongo_dao/carts.mongo';
import {CartsMongo} from '../dao/mongo_dao/carts.mongo';

const cartsMongo = new CartsMongo();

class CartsService {
/* 
    async addProduct(obj){
        const {id, ...infoProduct} = obj;
        const response = await cartsMongo.addProduct(id, infoProduct);
        return response
    }
     */
};

export const cartsService = new CartsService