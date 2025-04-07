import User from '../models/user.model.js';

const deleteAuthorization = async (req, res, next) => {
  try {
    
    if (req.auth && req.auth.role === 1) {
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
