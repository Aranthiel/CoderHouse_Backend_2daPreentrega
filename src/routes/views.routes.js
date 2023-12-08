import {Router} from 'express';
import {    
    renderHome,
    renderSignup,
    renderLogin,
    renderChat,
    renderRealTimeProducts,
    renderCartDetail,
    renderProductDetail
} from '../controllers/views.controller.js'



const viewsRouter = Router();

//viewsRouter.get("*",renderError);
viewsRouter.get('/home', renderHome ); //listo
viewsRouter.get ('/login', renderLogin ) //listo
viewsRouter.get ('/signup', renderSignup ); //listo
viewsRouter.get('/chat', renderChat ); 
viewsRouter.get('/realtimeproducts', renderRealTimeProducts); 
viewsRouter.get('/cart/:cid', renderCartDetail); 
viewsRouter.get('/product/:pid', renderProductDetail );


export default viewsRouter;