import {Router} from 'express'
import { SignIn, SignOut } from '../controllers/auth.controller.js';

const router = Router();

router.post('/auth/signin', SignIn)
router.get('/auth/signout', SignOut)

export default router;