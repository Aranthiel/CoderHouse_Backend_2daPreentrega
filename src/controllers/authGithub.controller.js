import passport from 'passport';
import { myCustomLogger } from '../config/configWinston.js';
import config from '../config/config.js';

const baseURL = config.baseURL;

async function passportGithubAuth (req, res, next){
    console.log('/api/auth/githubauth is alive');    
   // passport.authenticate('github', { scope: ['user:email'] }) es un middleware que maneja la autenticación con GitHub
    passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
}

async function passportGithubCallback (req, res, next) {
    console.log('/api/auth/githubcallback is alive');
    passport.authenticate('github', async (err, user, info) => {
        try {
            if (err) {
                myCustomLogger.error(err);
                return res.redirect('/error'); // Manejar errores de autenticación
            }
            if (!user) {
                // Manejar el caso de error de autenticación o usuario inexistente
                return res.redirect('/login'); // Redirigir a la página de login
            }
            
            // Almacenar información del usuario en la sesión
        req.session.usuario = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            cart: user.cart,
            // Otras propiedades del usuario si son necesarias
        };

        // Establecer la cookie con la información del usuario
        res.cookie('userInfo', req.session.usuario, { maxAge: 900000, httpOnly: true });

        res.redirect(`${baseURL}/home`);
        } catch (error) {
            myCustomLogger.error(error);
            res.redirect('/error'); // Manejar errores internos
        }
    })(req, res, next);
};

export {
    passportGithubAuth,
    passportGithubCallback,
    }