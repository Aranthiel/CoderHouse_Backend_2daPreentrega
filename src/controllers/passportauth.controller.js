import { usersService } from '../services/users.service.js';
import { hashData, compareData } from "../utils.js";
import config from '../config/config.js';
//import import jwt from 'jsonwebtoken';

import passport from "passport";

const baseURL = config.baseURL;

async function passportLocalAuthSignup(req, res, next) { //el usuario se crea, pero no se hace la redireccion
    console.log('ejecutando passportLocalAuthSignup desde users.controller.js') 
    
    const { first_name, last_name, email, password } = req.body;

    passport.authenticate("signup")(req, res, async (err) => {
        console.log('probando passport local signup');
        if (err) {
            // Maneja errores si ocurren durante la autenticación
            console.log(err);
            return res.redirect("/error"); // Redirige a la página de error en caso de error
        }
        res.redirect(`${baseURL}/realtimeproducts`);
    })

};

async function passportLocalAuthLogin(req, res, next) {
    console.log('ejecutando passportLocalAuthLogin desde users.controller.js');
    res.send('ejecutando passportLocalAuthLogin desde users.controller.js');
    const {email, password} = req.body

    passport.authenticate("login")(req, res, async (err) => {  
        console.log('probando passport local login');
        if (err) {
            // Maneja errores si ocurren durante la autenticación
            console.log(err);
            return res.redirect("/error"); // Redirige a la página de error en caso de error
        }
        //res.redirect(`${baseURL}/home`);
    });
}

/*
const passportGithubAuth = passport.authenticate("github", { scope: ["user:email"] });


const passportGithubCallback = (req, res, next) => {
    console.log('ejecutando passportGithubCallback en users.controller.js')
    return res.redirect("/productsFS");
    };
*/



export {
    passportLocalAuthSignup,
    passportLocalAuthLogin,
    //passportGithubAuth, 
    //passportGithubCallback 
    }