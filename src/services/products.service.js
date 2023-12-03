import {productsMongo} from '../dao/mongo_dao/products.mongo.js';


class ProductsService {   

    async getAllProducts(limit){
        console.log('ejecutando getAllProducts en products.service.js')
        try {
            const productsList = await productsMongo.findAllAndLimit(limit);
            
        return productsList;
        } catch (error) {
            console.error('No se encontraron productos', error);
            return error
        }
    }
        
    async getProductById(pid){
        console.log('ejecutando getProductById en products.service.js')
        try {
            const product = await productsMongo.findById(pid);            
            
            if(!product){
                //return `ERROR:NOT FOUND. El producto ${productId} NO se encuentra en el listado de productos, por favor ingrese un producto válido`;
                console.log(`ERROR:NOT FOUND. El producto ${pid} NO se encuentra en el listado de productos, por favor ingrese un producto válido`);
                return null; // Devuelve null en lugar de una cadena de error
        
            } else {
                return product;
            };
            
        } catch (error) {
            console.error('No se encontró el producto solicitado', error);
            return error
        }
    };    
    
    async addProduct(obj){
        console.log('ejecutando addProduct en products.service.js')
        try {
            const newProduct= await productsMongo.createOne(obj); 
            return newProduct;
        } catch (error) {
            console.error('No se pudo agregar el producto', error);
            return error
        }
    };
    
    async updateProduct(pid, obj){
        console.log('ejecutando updateProduct en products.service.js')        
        try {
            // Buscar el producto a actualizar por su ID
            let response = await productsMongo.updateOne(pid, obj);

            if (!response) {
                // Producto no encontrado, devuelve null
                return null;
            }
            let product = await productsMongo.findById(pid);
            return product;
    
        } catch (error) {
            console.error('No se logró actualizar el producto', error);
            return error;
        }
    };
        
    async deleteProduct(pid){
        console.log('ejecutando deleteProduct en products.service.js');
        try {
            const product = await productsMongo.deleteOne(pid);
            return product;
        } catch (error) {
            console.error('No se logró eliminar el producto', error);
            return error;
        }
            
    };
};

export const productService = new ProductsService