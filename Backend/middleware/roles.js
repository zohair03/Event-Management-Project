const authorizedRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ massage: `Access denied for ${req.user.role}` });
    }
    next();
  };
};

export { authorizedRoles };