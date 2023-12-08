import {Router} from 'express';
import config from '../config/config.js'

const baseURL= config.baseURL;

const errorRouter = Router();

errorRouter.get("*", async (req, res) => {
    const { email, first_name, cart }= req.session || "";
    
    res.status(404).render('error', {
        status: 'error',
        message: 'Route not found.',
        data: {},
        baseURL, email, first_name, cart
    });
});

export default errorRouter;