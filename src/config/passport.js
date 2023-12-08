import passport from "passport";
import {usersPersistence} from '../config/persistenceManager.js';
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2";
import { hashData, compareData } from "./utils.js";
import config from "./config.js";

//https://www.npmjs.com/package/passport

// passport-local
passport.use(
    "signup",
    new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            try {
                console.log('ejecutando passport.use signup desde passport.js')
                const allReadyExist = await usersPersistence.findByEmail(email);
                if (allReadyExist) {
                    console.log('allReadyExist en passport.js')
                    return done(null, false);
                }
                const hashedPassword = await hashData(password);
                const newUser = await usersPersistence.createOne({
                    ...req.body,
                    password: hashedPassword,
                });
                
                done(null, newUser);
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
                const userByEmail = await usersPersistence.findByEmail(email);
                if (!userByEmail) {
                    console.log('!userByEmail en passport.js')
                return done(null, false);
                }
                const isValid = await compareData(password, userByEmail.password);
                if (!isValid) {
                    console.log('!isValid en passport.js')
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



