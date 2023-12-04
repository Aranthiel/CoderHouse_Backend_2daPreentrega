// Middleware para validar datos al agregar usuario
export const validateProductData = (req, res, next) => {
    const { username, email, password } = req.body;

    // Aquí aplicas las validaciones específicas para la creación de usuarios
    // Verificas que los campos requeridos estén presentes, tipos de datos correctos, etc.

    // Si pasa la validación, pasas al siguiente middleware o al controlador
    next();
};

// Middleware para validar datos al actualizar usuario
export const validateUpdateProductData = (req, res, next) => {
    const { userId } = req.params;
    const { /* campos a actualizar */ } = req.body;

    // Aquí aplicas las validaciones específicas para la actualización de usuarios
    // Verificas que el ID exista, los campos a actualizar tengan el formato correcto, etc.

    // Si pasa la validación, pasas al siguiente middleware o al controlador
    next();
};
