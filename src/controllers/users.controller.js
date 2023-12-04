import { usersService } from '../services/users.service.js';

//funcion intermedia entre router y manager metodo GET para obtener TODOS LOS usuarioS
async function getAllUsers(req, res){
    console.log('ejecutando getAllUsers en users.controller.js')
    const limit = req.query.limit ? req.query.limit : undefined;   

    try {
        const users = await usersService.getAllUsers(limit);
        if (!users.length) {
            res.status(404).json({ success: false, message: 'No se encontraron usuarios'})        
        } else {
            res.status(200).json({success: true, message: 'Usuarios encontrados con éxito:', users})
            return users;
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
} //funciona OK 2/12

//funcion intermedia entre router y manager metodo GET para obtener un usuario POR SU ID
async function getUserById (req, res){
    console.log('ejecutando getUserById en users.controller.js')
    const {userId}=req.params;    
        
    try {        
        const userById = await usersService.getUserById(userId);
        if (userById){
            res.status(200).json({success: true, message: 'Usuario encontrado con éxito:', userById})
            return userById;
        } else {
            res.status(404).json({ success: false, message: 'No se encontró el Id de usuario solicitado'})
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}; //funcionaOK 3/12

//funcion intermedia entre router y manager metodo POST para APGREGAR usuario
async function addUser (req, res){
    console.log('ejecutando addUser en users.controller.js')   
    const nuevoUsuario= req.body
    
    try {
        const usuarioAgregado = await usersService.createUser(nuevoUsuario);
        if (usuarioAgregado){
            res.status(200).json({success: true, message: 'Usuario agregado con éxito:', usuarioAgregado});
            return usuarioAgregado; 
        } else {
            res.status(404).json({ success: false, message: 'No se pudo agregar el usuario solicitado'});
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

    
    
}; //funcionaOK 3/12

//funcion intermedia entre router y manager metodo PUT para actualizar un usuario por su ID
async function updateUser (req , res){
    console.log('ejecutando updateUser en users.controller.js')    
    const {userId}=req.params;
    const newValues= req.body;
    try {
        const response = await usersService.updateUser(userId, newValues);
        
        if(response != null){
            res.status(200).json({success: true, message: 'Usuario actualizado con éxito:', response});
        } else {
            res.status(404).json({ success: false, message: 'No se encontró el Id de usuario solicitado'});
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}; //funcionaOK 3/12

//funcion intermedia entre router y manager metodo DELETE para eliminar un usuario por su ID
async function deleteUser(req , res){
    console.log('ejecutando deleteUser en users.controller.js')
    const {userId}=req.params;
    try {
        const deleteduser = await usersService.deleteUser(userId);
        if (deleteduser) {
            res.status(200).json({success: true, message: 'Usuario eliminado con éxito:', deleteduser}); 
        } else {
            res.status(404).json({ success: false, message: 'No se encontró el Id de usuario solicitado'});
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
} //funcionaOK 3/12


export {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
}