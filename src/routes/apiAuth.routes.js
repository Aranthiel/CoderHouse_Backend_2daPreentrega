import {Router} from 'express';
import {
        passportGithubAuth, 
        passportGithubCallback 
    } from '../controllers/authGithub.controller.js'
    import {
        userLocalSignup,
        userLocalLogin
    } from '../controllers/authLocal.controller.js'
    import {
        passportLocalAuthSignup,
        passportLocalAuthLogin,
    } from '../controllers/authPasportLocal.controller.js';

const apiUsersAuth = Router();

// passport-github
//IMPORTANTE  siempre tiene que estar ANTES que las estrategias locales para que funcione oñ
//apiUsersAuth.post("/githubauth", passportGithubAuth); //solo para pruebas, la correcta es la get
apiUsersAuth.get("/githubauth", passportGithubAuth);
apiUsersAuth.get("/githubcallback", passportGithubAuth, passportGithubCallback);


//passport-local
apiUsersAuth.post('/passportsignup', passportLocalAuthSignup);
apiUsersAuth.post('/passportlogin', passportLocalAuthLogin);

//LOCAL 
///api/auth/signup
apiUsersAuth.post('/signup', userLocalSignup ); 
apiUsersAuth.post('/login', userLocalLogin ); 

export default apiUsersAuth;