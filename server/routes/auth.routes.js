import {Router} from 'express'
import { SignIn, signOut } from '../controllers/auth.controller.js';

const router = Router();

router.post('/auth/signin',SignIn)
router.get('/auth/signout',signOut)

export default router;