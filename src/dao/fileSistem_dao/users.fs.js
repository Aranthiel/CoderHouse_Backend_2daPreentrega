import { userModel } from '../../models/users.models.js';
import fs from 'fs';
import { writeDataToFile } from './fsUtils.js';

/*
async function writeDataToFile(path, data) {
	try {
		console.log('writeDataToFile path  users.fs.js', path);
		await fs.writeFile(path, JSON.stringify(data, null, 2));
	} catch (error) {
		throw new Error(
			`Error al escribir en el archivo ${path}: ${error.message}`
		);
	}
}
*/

export class UsersFS {
    constructor(path) {        
        this.path = path;
    }

    async findAll() {
        console.log('ejecutando findAll en users.fs.js')
        return new Promise(async (resolve, reject) => {
            try {
                if (fs.existsSync(this.path)) {
                    const info = await fs.promises.readFile(this.path, 'utf-8');
                    let users = JSON.parse(info);
                    resolve(users);

                }else {
                    resolve([]);
                }
            } catch (error) {
                reject(new Error(`Error al leer el archivo: ${error.message}`));
            }
        });
    }

    async findById(userId) {
        console.log('ejecutando findById en users.fs.js')
        const uid = +userId;
        return new Promise(async (resolve, reject) => {
            try {
                const users = await this.findAll();
                const user = users.find(user => user.id === uid);
                resolve(user || null);
            } catch (error) {
                reject(new Error(`Error al buscar el usuario: ${error.message}`));
            }
        });
    }

    async findByEmail(email) {
        console.log('ejecutando findByEmail en users.fs.js')
        return new Promise(async (resolve, reject) => {
            try {
                const users = await this.findAll();
                const user = users.find(user => user.email === email);
                resolve(user || null);
            } catch (error) {
                reject(new Error(`Error al buscar el usuario: ${error.message}`));
            }
        });
    }

    async createOne(obj) {
        console.log('ejecutando createOne en users.fs.js')        
        return new Promise(async (resolve, reject) => {
            try {                
                const users = await this.findAll();
                if (users.length > 0){
                    const userExist = await this.findByEmail(obj.email);
                    if (userExist) {
                        reject(new Error(`El email de usuario ${obj.email} ya está registrado y no se puede utilizar`));
                    }
                    else {
                        obj.id = users[users.length - 1].id + 1;
                        users.push(obj);
                    }
                }else {
                    obj.id = 1;
                    users.push(obj);
                }
                await writeDataToFile(this.path, users); // Utiliza el array de usuarios obtenido
                resolve(obj);
                
            } catch (error) {
                reject(new Error(`Error al crear el usuario: ${error.message}`));
            }
        });
    }

    async updateOne(userId, newValue) {
        console.log('ejecutando updateOne en users.fs.js')
        const uid = +userId;
        return new Promise(async (resolve, reject) => {
            try {
                let user = await this.findById(uid);

                if (!user) {
                    reject(new Error('Usuario no encontrado para actualizar'));
                } else {
                    // Actualizar el usuario con los nuevos valores y mantener el ID original                    
                    user = { ...user, ...newValue, id: uid };
    
                    // Recuperar el arreglo de usuarios
                    const users = await this.findAll();
    
                    // Encontrar el índice del usuario en el arreglo
                    const userIndex = users.findIndex(p => p.id === uid);
    
                    // Crear un nuevo array con el usuario actualizado usando splice
                    users.splice(userIndex, 1, user);
                    
    
                    // Sobreescribir el archivo .json 
                    await writeDataToFile(this.path, users);
    
                    // Retorna el usuario actualizado
                    resolve(user);
                }
            } catch (error) {
                reject(new Error(`Error al actualizar el usuario: ${error.message}`));
            }
        });
    }

    async deleteOne(userId) {
        console.log('ejecutando deleteOne en users.fs.js')
        const uid = +userId;
        return new Promise(async (resolve, reject) => {
            try {
                const user = await this.findById(uid);
                if (!user) {
                    reject(new Error('Usuario no encontrado para eliminar'));
                } else {
                    // Recuperar el arreglo de usuarios
                    const users = await this.findAll();
    
                    // Filtrar los usuarios para excluir el usuario a eliminar
                    const usersNew = users.filter(prod => prod.id !== uid);
    
                    // Sobreescribir el archivo .json con los productos actualizados
                    await writeDataToFile(this.path, usersNew);
    
                    // Resolver la promesa indicando que se ha eliminado el producto
                    resolve(true);
                }
            } catch (error) {
                reject(new Error(`Error al eliminar el usuario: ${error.message}`));
            }
        });
    }
}

