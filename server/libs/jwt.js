import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export const createAccessToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            config.jwtSecret,
            { expiresIn: '4h' }, 
            (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            }
        );
    });
};