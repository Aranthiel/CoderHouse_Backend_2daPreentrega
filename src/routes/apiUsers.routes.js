import {Router} from 'express';
import {
    getAllUsers,
    getUserById,
    addUser,
    updateUser, 
    deleteUser, 
} from '../controllers/users.controller.js'


const apiUsersRouter = Router();

//endpopint GET para obtener TODOS LOS UserOS
apiUsersRouter.get('/', getAllUsers); 

//endpopint GET para obtener un UserO POR SU ID
apiUsersRouter.get('/:UserId', getUserById); 

//Endpoint POST para APGREGAR UserO
apiUsersRouter.post('/', addUser ); 

//Endpoint PUT para actualizar un Usero por su ID
apiUsersRouter.put('/:UserId', updateUser );

//Endpoint DELETE para eliminar un Usero por su ID
apiUsersRouter.delete('/:UserId', deleteUser );


export default apiUsersRouter;