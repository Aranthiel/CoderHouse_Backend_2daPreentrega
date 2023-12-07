import {Router} from 'express';
import apiProductsRouter from './apiProducts.routes.js';
import apiCartsRouter from './apiCarts.routes.js';
import apiUsersRouter from './apiUsers.routes.js';
import apiUsersAuth from './apiAuth.routes.js';


const apiRouter = Router();
apiRouter.use('/products', apiProductsRouter);
apiRouter.use('/carts', apiCartsRouter);
apiRouter.use('/users', apiUsersRouter);
apiRouter.use('/auth', apiUsersAuth);

export default apiRouter;