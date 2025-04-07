import { expressjwt } from 'express-jwt'
import config from '../config/config.js';

const requireSignIn = expressjwt({
    secret: config.jwtSecret,
    algorithms: ['HS256'], 
    userProperty: 'auth', 
    
});

export { requireSignIn };