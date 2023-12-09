import {Router} from 'express';
import {
        userLocalSignup,
        userLocalLogin
} from '../controllers/localauth.controller.js'
import {
        passportLocalAuthSignup,
        passportLocalAuthLogin,
        //passportGithubAuth, 
        //passportGithubCallback 
} from '../controllers/passportauth.controller.js'



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
apiUsersAuth.post('/passportsignup', passportLocalAuthSignup);
apiUsersAuth.post('/passportlogin', passportLocalAuthLogin);




export default apiUsersAuth;