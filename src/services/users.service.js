import {usersMongo} from '../dao/mongo_dao/users.mongo';
import { hashData }from '../utils.js';

class UsersService{
    async getAllUsers(){
        console.log('ejecutando getAllUsers en users.service.js');
        try {
            const response = await usersMongo.findAll()
            return response;
        } catch (error) {
            console.error('No se encontraron usuarios', error);
            return error;
        }
    };

    async getUserById(id){
        console.log('ejecutando getUserById en users.service.js');
        try {
            const response = await usersMongo.findById(id)
            return response
        } catch (error) {
            console.error('No se encontró el usuario solicitado', error);
            return error;            
        };
    };

    async getUserByEmail(email){
        console.log('ejecutando findUserByEmail en users.service.js');
        try {
            const response = await usersMongo.findByEmail( email );
            return response;
        } catch (error) {
            console.error('No se encontró el usuario solicitado', error);
            return error;
        }
    }
    
    async createUser(obj) {
        const {password} = obj;
        const hashedPassword= hashData(password)
        console.log('ejecutando createUser en users.service.js');
        try {
            const response = await usersMongo.createOne({...obj, password:hashedPassword,});
            console.log('Usuario creado con éxito:', response);
            return response;
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            return error;
        }
    }

    async updateUser(id, obj) {
        console.log('ejecutando createUser en users.service.js');
        try {
            const response = await usersMongo.updateOne(id, obj);
            console.log('Usuario actualizado con éxito:', response);
            return response;
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            return error;
        }
    }

    async deleteUser(id) {
        console.log('ejecutando createUser en users.service.js');
        try {
            const response = await usersMongo.deleteOne(id);
            console.log('Usuario actualizado con éxito:', response);
            return response;
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            return error; 
        }
    }    
}

export const usersService = new UsersService();