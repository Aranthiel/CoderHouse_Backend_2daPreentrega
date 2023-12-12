import passport from "passport";
import {usersService} from '../services/users.service.js';
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2";
import { hashData, compareData } from "../utils.js";
import config from "./config.js";

//https://www.npmjs.com/package/passport

// passport-local
passport.use(
    "plocalsignup",
    new LocalStrategy(
        {
            usernameField: "email", // indica que en lugar de hcer el loguin con nombre de usuario, utiliza mail
            passReqToCallback: true, // pasa la informacion de req al callback
        },
        async (req, email, password, done) => {
            const { first_name, last_name } = req.body;
            try {
                //verifica si ya existe un usuario con el email 
                const allReadyExist = await usersService.getUserByEmail(email);
                if (allReadyExist) {
                    return done(null, false); //no hubo error, pero no devuelve usuario
                }
                const nuevoUsuario = {
                    first_name, 
                    last_name, 
                    email, 
                    password
                }
                const usuarioAgregado = await  usersService.createUser(nuevoUsuario);                
                done(null, usuarioAgregado); //
            } catch (error) {
            done(error);
            }
        }
    )
);

passport.use(
    "login",
    new LocalStrategy(
        {
        usernameField: "email",
        },
        async (email, password, done) => {
            try {
                console.log('ejecutando passport.use login desde passport.js')
                const userByEmail = await usersService.getUserByEmail(email);
                if (!userByEmail) {                    
                    return done(null, false);
                }
                const isValid = await compareData(password, userByEmail.password);
                if (!isValid) {                    
                return done(null, false);
                }
                
                done(null, userByEmail);
            } catch (error) {
                done(error);
            }
        }
    )
); 

//passport-github
passport.use("github",
    new GitHubStrategy({
        clientID: config.ghithub_client_id,
        clientSecret: config. github_client_secret,
        callbackURL: config.github_callback_url
    },
    async function(accessToken, refreshToken, profile, done) {
        console.log('passport.use github')
        console.log("user name en passport-github", profile._json.login); 
        console.log("user email en passport-github", profile._json.email); 
        const githubInfo ={
            name:profile._json.login,             
            email:profile._json.email, 
        }

        done(null, false);// si no le pongo false, se rompe, pero cn  false entiendo que devuelve un "error"
    }
));

//serializeUser
//metodo interno de passport
//recupera el usuario y se queda solamente con el id
passport.serializeUser(function(user, done) {
    done(null, user._id);
});

//deserializeUser
//metodo interno de passport
//con el id recupera la informacion del usuario
passport.deserializeUser(async function(id, done) {
    //mi codigo
    try {
        const user = await usersPersistence.findById(id);
        done(null, user);
    } catch (error) {
        done(error)
    }
});



