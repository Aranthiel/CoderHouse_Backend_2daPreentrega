import passport from 'passport';
import { myCustomLogger } from '../config/configWinston.js';
import config from '../config/config.js';

const baseURL = config.baseURL;

async function passportLocalAuthSignup(req, res, next) {
    console.log('/api/auth/passportsignup is alive');
    

    passport.authenticate('plocalsignup', async (err, user, info) => {
        try {
            if (err) {
                myCustomLogger.error(err);
                return res.redirect('/error'); // Manejar errores de autenticación
            }
            if (!user) {
                // Manejar el caso de usuario no creado debido a un error o ya existente
                return res.redirect('/signup'); // Redireccionar a página de signup
            }
            // Llamar a passportLocalAuthLogin para iniciar sesión automáticamente después del registro
            passportLocalAuthLogin(req, res);
        } catch (error) {
            myCustomLogger.error(error);
            res.redirect('/error'); // Manejar errores internos
        }
    })(req, res, next);
}

async function passportLocalAuthLogin(req, res, next) {
    console.log('/api/auth/passportlogin is alive');

    passport.authenticate('plocallogin', async (err, user, info) => {
        
        try {
            if (err) {
                console.log("error1")
                myCustomLogger.error(err);
                return res.redirect('/error'); // Manejar errores de autenticación
            }
            console.log("!user", !user)
            if (!user) {
                // Manejar el caso de credenciales incorrectas o usuario inexistente
                return res.redirect('/login'); // Redireccionar a página de login
            }

            // Almacenar información del usuario en la sesión
            req.session = {
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                cart: user.cart,
                // Otras propiedades del usuario si son necesarias
            };
            console.log('session')

            // Establecer la cookie con la información del usuario
            res.cookie('userInfo', req.session, { maxAge: 900000, httpOnly: true });
            console.log('cookie')
            console.log('redirect')
            console.log(`${baseURL}/home`)

            res.redirect(`${baseURL}/home`);
        } catch (error) {
            console.log('error2')
            myCustomLogger.error(error);
            res.redirect('/error'); // Manejar errores internos
        }
    })(req, res, next);
}

export {
    passportLocalAuthSignup,
    passportLocalAuthLogin,
};
