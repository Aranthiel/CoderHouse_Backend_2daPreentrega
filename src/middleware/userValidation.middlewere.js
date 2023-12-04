import { userModel } from '../models/users.models.js';

// Middleware para validar datos al agregar usuario
export const validateUserCreation = async (req, res, next) => {
    const { first_name, last_name, email, password } = req.body;

    try {
        // Validación con Mongoose
        const newUser = new userModel({ first_name, last_name, email, password });
        await newUser.validate();

        next();
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error de validación en la creación de usuario', error: error.message });
    }
};


