import { userModel } from '../../models/users.models.js';
import { BasicMongo} from './basic.mongo.js';

class UsersMongo extends BasicMongo{
    constructor(){
        super(userModel);
    }
}

export const usersMongo = new UsersMongo();