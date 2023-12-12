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

// passport-github
/*
apiUsersAuth.get("/githubAuth", passportGithubAuth);
apiUsersAuth.get("/githubCallback", passportGithubAuth, passportGithubCallback);
*/

//passport-local
apiUsersAuth.post('/passportsignup', passportLocalAuthSignup);
apiUsersAuth.post('/passportlogin', passportLocalAuthLogin);

//LOCAL 

apiUsersAuth.post('/signup', userLocalSignup ); 
apiUsersAuth.post('/login', userLocalLogin ); 


export default apiUsersAuth;