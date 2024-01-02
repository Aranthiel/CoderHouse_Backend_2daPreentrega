import { usersService } from '../services/users.service.js';
import { hashData, compareData } from "../utils.js";
import config from '../config/config.js';
import {myCustomLogger} from '../config/configWinston.js'

const baseURL = config.baseURL;

async function  userLocalSignup  (req, res) {
    console.log('/api/auth/signup is alive');
    console.log('req.body', req.body);

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
            await userLocalLogin(req, res); // una vez creado el usuario, lo loguea automaticamente
        }

        } catch (error) {
        return res.status(500).json({ success: false, message: 'Error al registrar el usuario', error: error.message });
    }
};

async function  userLocalLogin (req, res)  {
    console.log('/api/auth/login is alive');
    console.log('req.body', req.body);
    const { email, password } = req.body;
    
    try {
         // Obtener el usuario por su correo electrónico
        const userByEmail = await usersService.getUserByEmail(email);
        
        if (!userByEmail) {
            return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }

         // Comparar la contraseña ingresada con la almacenada en la base de datos
        const passwordMatch = await compareData(password, userByEmail.password);
        
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }

        // Almacenar información del usuario en la sesión
        req.session.usuario = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            cart: user.cart,
            // Otras propiedades del usuario si son necesarias
        };

        // Establecer la cookie con la información del usuario
        res.cookie('userInfo', req.session.usuario, { maxAge: 900000, httpOnly: true });

        console.log('!user', !user)
        console.log('passwordMatch', passwordMatch)
        console.log('!passwordMatch', !passwordMatch)
        console.log('baseURL', baseURL)

        res.redirect(`${baseURL}/home`);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error al iniciar sesión', error: error.message });
    }
};

export {
    userLocalSignup,
    userLocalLogin,
    }