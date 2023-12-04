import {Router} from 'express';
import {
    getAllUsers,
    getUserById,
    addUser,
    updateUser, 
    deleteUser, 
} from '../controllers/users.controller.js'
import { validateUserCreation } from '../middleware/userValidation.middlewere.js'


const apiUsersRouter = Router();

//endpopint GET para obtener TODOS LOS UserOS
apiUsersRouter.get('/', getAllUsers); 

//endpopint GET para obtener un UserO POR SU ID
apiUsersRouter.get('/:userId', getUserById); 

//Endpoint POST para APGREGAR UserO
apiUsersRouter.post('/', validateUserCreation, addUser ); 

//Endpoint PUT para actualizar un Usero por su ID
apiUsersRouter.put('/:userId', updateUser );

//Endpoint DELETE para eliminar un Usero por su ID
apiUsersRouter.delete('/:userId', deleteUser );


export default apiUsersRouter;