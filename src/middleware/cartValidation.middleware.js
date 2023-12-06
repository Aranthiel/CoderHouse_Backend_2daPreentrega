import { cartModel } from '../models/carts.model.js';

// Middleware para validar que los datos tengan el formato correcto
export const validateCartCreation = async (req, res, next) => {
    const { products } = req.body;

    try {
        // Validación con Mongoose para el esquema del carrito
        const newCart = new cartModel({ products });
        await newCart.validate();

        next();
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error de validación en la creación del carrito', error: error.message });
    }
};


