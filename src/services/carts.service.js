//import {cartsMongo} from '../dao/mongo_dao/carts.mongo';
import {cartsPersistence} from '../config/persistenceManager.js';
class CartsService {

    async getAllCarts(limit){
        console.log('ejecutando getAllCarts en carts.service.js');
        try {
            const response = await cartsPersistence.findAll()
            return response;
        } catch (error) {
            console.error('No se encontraron carritos', error);
            return error;
        }
    };

    async getCartById(cid){
        console.log('ejecutando getCartById en carts.service.js');
        try {
            const response = await cartsPersistence.findById(cid)
            return response
        } catch (error) {
            console.error('No se encontró el carrito solicitado', error);
            return error;            
        };
    };

    async createCart(products){
        console.log('ejecutando createCart en carts.service.js');
        const cartProducts = products; 
        try {
            const response = await cartsPersistence.createOne(cartProducts);
            console.log('Carrito creado con éxito:', response);
            return response;
        } catch (error) {
            console.error('Error al crear el carrito:', error);
            return error;
        }
    };

    async updateCart(cartId, updateCartProducts) {
        console.log('ejecutando updateCart en carts.service.js');
        try {
            // Actualizar el carrito con los productos actualizados
            const response = await cartsPersistence.updateOne(cartId, { products: updateCartProducts });
    
            // Devolver los productos actualizados
            return {response, message: 'Carrito actualizado con éxito'  };
        } catch (error) {
            console.error('Error al actualizar el carrito:', error);
            throw new Error(`Error al actualizar el carrito: ${error.message}`);
        }
    }
    

    async deleteCart(cid){
        console.log('ejecutando deleteCart en carts.service.js');
        try {
            const response = await cartsPersistence.deleteOne(cid);
            console.log('Carrito actualizado con éxito:', response);
            return response;
        } catch (error) {
            console.error('Error al actualizar el carrito:', error);
            return error; 
        }
    };
};

export const cartsService = new CartsService();