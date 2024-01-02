import { usersService } from '../../services/users.service.js';
import { hashData, compareData } from "../../utils.js";
import config from '../../config/config.js';
//import import jwt from 'jsonwebtoken';
//winston 
import {myCustomLogger} from '../../config/configWinston.js'

import passport from "passport";

const baseURL = config.baseURL;

async function passportLocalAuthSignup(req, res, next) { //el usuario se crea, pero no se hace la redireccion
    alert('ejecutando passportLocalAuthSignup desde passportauth.controller.js') 

    passport.authenticate("plocalsignup")(req, res, async (err) => {
        myCustomLogger.test('probando passport local signup');
        if (err) {
            // Maneja errores si ocurren durante la autenticación
            myCustomLogger.test(err);
            return res.redirect("/error"); // Redirige a la página de error en caso de error
        }
        await passportLocalAuthLogin(req, res);
        //res.redirect(`${baseURL}/home`);// pongo redireccion al chat para confirmar si se hace la redireccion correctamente, ya que esta tomando la estrategia login local
    })

};

async function passportLocalAuthLogin(req, res, next) {
    alert('ejecutando passportLocalAuthLogin desde passportauth.controller.js');

    passport.authenticate("login")(req, res, async (err) => {  
        myCustomLogger.test('probando passport local login');
        if (err) {
            // Maneja errores si ocurren durante la autenticación
            myCustomLogger.error(err);
            return res.redirect("/error"); // Redirige a la página de error en caso de error
        }
        res.redirect(`${baseURL}/home`);
    });
}

export {
    passportLocalAuthSignup,
    passportLocalAuthLogin,
    }