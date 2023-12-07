import {Router} from 'express';
import {    
    renderHome,
    renderSignup,
    renderLogin,
    renderChat,
    renderRealTimeProducts,
    renderCartDetail,
    renderProductDetail,
    renderError,
} from '../controllers/views.controller.js'



const viewsRouter = Router();

//viewsRouter.get("*",renderError);
viewsRouter.get('/home', renderHome ); 
viewsRouter.get ('/login', renderLogin )
viewsRouter.get ('/signup', renderSignup );
viewsRouter.get('/chat', renderChat ); 
viewsRouter.get('/realtimeproducts', renderRealTimeProducts); 
viewsRouter.get('/carts', renderCartDetail); 
viewsRouter.get('/productsFS', renderProductDetail );


export default viewsRouter;