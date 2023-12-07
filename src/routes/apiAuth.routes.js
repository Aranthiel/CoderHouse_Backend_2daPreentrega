import {Router} from 'express';
import {
        userLocalSignup,
        userLocalLogin,
        //passportLocalAuthSignup,
        //passportLocalAuthLogin,
        //passportGithubAuth, 
        //passportGithubCallback 
} from '../controllers/auth.controller.js'


const apiUsersAuth = Router();

//Endpoint POST para REGISTRAR un usuario de forma local
apiUsersAuth.post('/signup', userLocalSignup ); 

//Endpoint POST para LOGUEAR un usuario de forma local
apiUsersAuth.post('/login', userLocalLogin ); 

// passport-github
/*
apiUsersAuth.get("/githubAuth", passportGithubAuth);
apiUsersAuth.get("/githubCallback", passportGithubAuth, passportGithubCallback);
*/

//passport-local
/*
apiUsersAuth.post('/passportlogin', passportLocalAuthLogin);
apiUsersAuth.post('/passportsignup', passportLocalAuthSignup);
*/

export default apiUsersAuth;