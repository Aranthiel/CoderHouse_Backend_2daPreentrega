import { cartModel } from '../../models/carts.model.js';
import {BasicMongo} from './basic.mongo.js';

class CartsMongo extends BasicMongo{
    constructor(){
        super(cartModel);
    }

    
}

export const cartsMongo = new CartsMongo();