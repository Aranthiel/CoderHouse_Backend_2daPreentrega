import passport from 'passport';
import { usersService } from '../services/users.service.js';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { hashData, compareData } from "../utils.js";
import config from './config.js';
import { myCustomLogger } from './configWinston.js';

const localSignupStrategy = new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        console.log('localSignupStrategy activada');
        const { first_name, last_name } = req.body;
        try {
            const alreadyExists = await usersService.getUserByEmail(email);
            if (alreadyExists) {
                return done(null, false);
            }
            const nuevoUsuario = {
                first_name,
                last_name,
                email,
                password,
            };
            const usuarioAgregado = await usersService.createUser(nuevoUsuario);
            return done(null, usuarioAgregado);
        } catch (error) {
            return done(error);
        }
    }
);

const localLoginStrategy = new LocalStrategy(
    {
        usernameField: 'email',
    },
    async (email, password, done) => {
        console.log('localLoginStrategy activada');
        try {
            const userByEmail = await usersService.getUserByEmail(email);

            if (!userByEmail) {
                return done(null, false);
            }
            

            const passwordMatch = await compareData(password, userByEmail.password);
            if (!passwordMatch) {
                return done(null, false);
            }
            console.log('userByEmail', userByEmail)
            return done(null, userByEmail);
        } catch (error) {
            console.log('passporerror')
            return done(error);
        }
    }
);

const githubStrategy = new GitHubStrategy(
    {
        clientID: config.ghithub_client_id,
        clientSecret: config.github_client_secret,
        callbackURL: config.github_callback_url,
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log('Estrategia de GitHub activada');
        try {
            const existingUser = await usersService.getUserByEmail(profile._json.email);

            if (existingUser) {
                if (existingUser.from_github) {
                    // Si el usuario ya existe y es de GitHub, se autentica sin modificar la sesión
                    return done(null, existingUser);
                } else {
                    return done(null, false);
                }
            }

            const newGithubUser = {
                first_name: profile._json.given_name,
                last_name: profile._json.family_name,
                email: profile._json.email,
                password: ' ',
                from_github: true,
            };

            const addGithubUser = await usersService.createUser(newGithubUser);
            return done(null, addGithubUser);
        } catch (error) {
            return done(error);
        }
    }
);

passport.use('plocalsignup', localSignupStrategy);
passport.use('plocallogin', localLoginStrategy);
passport.use('github', githubStrategy);

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
    try {
        const user = await usersPersistence.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export default passport;
