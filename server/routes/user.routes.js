import {Router} from 'express'
import { createUser, getUser, usersCount }  from '../controllers/user.controller.js';
import {requireSignIn} from '../middlewares/requireSignIn.js'
import { updateUser }  from '../controllers/user.controller.js';
import { deleteUser }  from '../controllers/user.controller.js';
import { getAllUsers } from '../controllers/user.controller.js';
import { hasAuthorization } from '../middlewares/hasAuthorization.js';
import { deleteAuthorization } from '../middlewares/deleteAuthorization.js';


const router = Router();

router.get('/api/users/count',requireSignIn, usersCount);
router.post('/api/users', createUser);
router.get('/api/users', getAllUsers);
router.get('/api/users/:id',requireSignIn, hasAuthorization, getUser);
router.get('/api/users',requireSignIn, hasAuthorization, getAllUsers);
router.put('/api/users/:id',requireSignIn,updateUser);
router.delete('/api/users/:id',requireSignIn, deleteAuthorization, deleteUser);


export default router;