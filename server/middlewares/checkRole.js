const checkRole = (requiredRoles) => {
    return (req, res, next) => {
      if (req.auth && requiredRoles.includes(req.auth.role)) {
        next();
      } else {
        return res.status(403).json({
          error: "User is not authorized"
        });
      }
    };
  };

  export { checkRole };