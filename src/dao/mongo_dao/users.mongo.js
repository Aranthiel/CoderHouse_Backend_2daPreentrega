import { userModel } from '../../models/users.models.js';
import { BasicMongo} from './basic.mongo.js';

 export class UsersMongo extends BasicMongo{
    constructor(){
        super(userModel);
    }
}

