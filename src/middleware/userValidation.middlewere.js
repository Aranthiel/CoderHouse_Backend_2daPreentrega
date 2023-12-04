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

// Middleware para validar datos al actualizar usuario
export const validateUserUpdate = async (req, res, next) => {
    const { userId } = req.params;
    const { data } = req.body;

    try {
        if (userId) {
            if (data.first_name && typeof data.first_name !== 'string') {
                return res.status(400).json({ success: false, message: 'Formato incorrecto para el campo first_name' });
            }

            if (data.last_name && typeof data.last_name !== 'string') {
                return res.status(400).json({ success: false, message: 'Formato incorrecto para el campo last_name' });
            }

            if (data.email && typeof data.email !== 'string') {
                return res.status(400).json({ success: false, message: 'Formato incorrecto para el campo email' });
            }

            if (data.password && typeof data.password !== 'string') {
                return res.status(400).json({ success: false, message: 'Formato incorrecto para el campo password' });
            }
        }

        next();
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al validar la actualización del usuario', error: error.message });
    }
};
