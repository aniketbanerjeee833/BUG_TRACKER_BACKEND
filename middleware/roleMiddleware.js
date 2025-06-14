const { logBug } = require("../models/bug");

// middleware/roleMiddleware.js
const roleMiddleware = async(req, res, next) => {
  if (!req.user || req.user.role !== 'ADMIN') {
      await logBug(req.user?.email , 'Error fetching bugs (Admin access)');
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
  next();
};
module.exports = roleMiddleware;