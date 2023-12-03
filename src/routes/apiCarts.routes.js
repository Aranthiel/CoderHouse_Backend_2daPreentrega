import {Router} from 'express';
import {
    getAllCarts,
    getCartById,
    addCart,
    updateCart, 
    deleteCart, 
} from '../controllers/carts.controller.js'


const apiCartsRouter = Router();

//endpopint GET para obtener TODOS LOS CartOS
apiCartsRouter.get('/', getAllCarts); 

//endpopint GET para obtener un CartO POR SU ID
apiCartsRouter.get('/:CartId', getCartById); 

//Endpoint POST para APGREGAR CartO
apiCartsRouter.post('/', addCart ); 

//Endpoint PUT para actualizar un Carto por su ID
apiCartsRouter.put('/:CartId', updateCart );

//Endpoint DELETE para eliminar un Carto por su ID
apiCartsRouter.delete('/:CartId', deleteCart );


export default apiCartsRouter;