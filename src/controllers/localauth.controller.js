import { usersService } from '../services/users.service.js';
import { hashData, compareData } from "../utils.js";
import config from '../config/config.js';
//import import jwt from 'jsonwebtoken';

const baseURL = config.baseURL;

async function userLocalSignup(req, res) {
    console.log(`ejecutando passportLocalAuthSignup desde localauth.controller.js`)
    const { first_name, last_name, email, password } = req.body;
    try {
        // Verificar si el usuario ya existe en la base de datos por el correo electrónico
        const allReadyExist = await usersService.getUserByEmail(email);
        if (allReadyExist) {
            return res.status(400).json({ success: false, message: 'El correo electrónico ya está registrado' });
        }

        const nuevoUsuario = {
            first_name, 
            last_name, 
            email, 
            password
        }

        const usuarioAgregado = await usersService.createUser(nuevoUsuario);
        if (usuarioAgregado instanceof Error){
            res.status(404).json({ success: false, message: 'No se pudo agregar el usuario solicitado'});
        return usuarioAgregado; 
        } else {
            await userLocalLogin(req, res);
            //res.status(200).json({success: true, message: 'Usuario agregado con éxito:', usuarioAgregado});
            }

        } catch (error) {
        return res.status(500).json({ success: false, message: 'Error al registrar el usuario', error: error.message });
    }
} // EL USUARIO SE CREA Y SE GUANDA EN LA DB - 

async function userLocalLogin(req, res){
    console.log(`ejecutando userLocalLogin desde localauth.controller.js`)
    const { email, password } = req.body;

    try {
        // Obtener el usuario por su correo electrónico
        const user = await usersService.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }

        // Comparar la contraseña ingresada con la almacenada en la base de datos
        const passwordMatch = await compareData(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }

        // Crear una copia del usuario sin la contraseña
        const userWithoutPassword = {
            _id:user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            cart:user.cart
        };

        // Guardar la información del usuario sin la contraseña en la sesión
        req.session._id = user._id; 
        req.session.first_name = user.first_name; 
        req.session.full_name = `${user.first_name} ${user.last_name}`;
        req.session.email = user.email;
        req.session.cart = user.cart

        // Establecer la cookie con la información del usuario
        res.cookie('_id', user._id, { maxAge: 900000, httpOnly: true });
        res.cookie('first_name', user.first_name, { maxAge: 900000, httpOnly: true });
        res.cookie('last_name', user.last_name, { maxAge: 900000, httpOnly: true });
        res.cookie('email', user.email, { maxAge: 900000, httpOnly: true });
        res.cookie('cart', user.cart, { maxAge: 900000, httpOnly: false });
        
        console.log('req.session en userLocalLogin', req.session)
        
        // Generar un token JWT con la información del usuario
        //const token = jwt.sign({ user: userWithoutPassword }, 'secret_key', { expiresIn: '1h' });

        
        
        res.redirect(`${baseURL}/home`);
        //return res.status(200).json({ success: true, message: 'Inicio de sesión exitoso', userWithoutPassword });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error al iniciar sesión', error: error.message });
    }
};

export {
    userLocalSignup,
    userLocalLogin,
    }