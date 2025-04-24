// import User from '../models/user.model.js';
import { ROLES } from '../../client/src/constants/roles.js';

const deleteAuthorization = async (req, res, next) => {
  try {
    
    if (req.auth && req.auth.role === ROLES.ADMIN) {
      next();
    } else {
      return res.status(403).json({
        error: "User is not authorized to delete accounts"
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Could not verify user authorization"
    });
  }
};

export { deleteAuthorization };
