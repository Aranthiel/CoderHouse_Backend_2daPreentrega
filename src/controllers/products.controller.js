import { productService } from '../services/products.service.js';

//funcion intermedia entre router y manager metodo GET para obtener TODOS LOS PRODUCTOS
async function getAllProducts(req, res){
    console.log('ejecutando getAllProducts en products.controller.js')
    const limit = req.query.limit ? req.query.limit : undefined;   

    try {
        const products = await productService.getAllProducts(limit);
        if (!products.length) {
            res.status(404).json({ success: false, message: 'No se encontraron productos'})        
        } else {
            res.status(200).json({success: true, message: 'Productos encontrados:', products})
            return products;
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
} //funciona OK 2/12

//funcion intermedia entre router y manager metodo GET para obtener un PRODUCTO POR SU ID
async function getProductById (req, res){
    console.log('ejecutando getProductById en products.controller.js')
    const {productId}=req.params;    
        
    try {        
        const productById = await productService.getProductById(productId);
        if (productById){
            res.status(200).json({success: true, message: 'Producto encontrado:', productById})
            return productById;
        } else {
            res.status(404).json({ success: false, message: 'No se encontro el Id de producto solicitado'})
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}; //funcionaOK 3/12

//funcion intermedia entre router y manager metodo POST para APGREGAR PRODUCTO
async function addProduct (req, res){
    console.log('ejecutando addProductC en products.controller.js')   
    const nuevoProducto= req.body
    console.log('nuevoProducto en products.controlles.js: ', nuevoProducto)
    try {
        const productoAgregado = await productService.addProduct(nuevoProducto);
        if (productoAgregado){
            res.status(200).json({success: true, message: 'Producto agregado:', productoAgregado});
            return productoAgregado; 
        } else {
            res.status(404).json({ success: false, message: 'No se pudo agregar el producto solicitado'});
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

    
    
}; //funcionaOK 3/12

//funcion intermedia entre router y manager metodo PUT para actualizar un producto por su ID
async function updateProduct (req , res){
    console.log('ejecutando updateProduct en products.controller.js')    
    const {productId}=req.params;
    const newValues= req.body;
    try {
        const response = await productService.updateProduct(productId, newValues);
        console.log(response);
        if(response != null){
            res.status(200).json({success: true, message: 'Producto actualizado:', response});
        } else {
            res.status(404).json({ success: false, message: 'No se encontro el Id de producto solicitado'});
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}; //funcionaOK 3/12

//funcion intermedia entre router y manager metodo DELETE para eliminar un producto por su ID
async function deleteProduct(req , res){
    console.log('ejecutando deleteProductC en products.controller.js')
    const {productId}=req.params;
    try {
        const deletedProduct = await productService.deleteProduct(productId);
        if (deletedProduct) {
            res.status(200).json({success: true, message: 'Producto eliminado con exito:', deletedProduct}); 
        } else {
            res.status(404).json({ success: false, message: 'No se encontro el Id de producto solicitado'});
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
} //funcionaOK 3/12


export {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    }
