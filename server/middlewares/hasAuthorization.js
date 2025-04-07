import User from '../models/user.model.js';

export const hasAuthorization = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        const authorized = req.auth && user._id == req.auth._id;

        if (!authorized) {
            return res.status(403).json({
                error: "User is not authorized"
            });
        }

        req.user = user; 
        next();
    } catch (error) {
        return res.status(500).json({
            error: "Could not retrieve user"
        });
    }
};
