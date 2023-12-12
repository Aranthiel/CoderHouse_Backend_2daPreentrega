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

errorRouter.get("/", async (req, res) => {
    // Revisar si baseURL está disponible o configurado correctamente
    if (baseURL) {
        res.redirect(`${baseURL}/home`);
    } else {
        // Si no se puede obtener baseURL, redirigir a una ruta predeterminada
        res.render('home');
    }
});

export default errorRouter;