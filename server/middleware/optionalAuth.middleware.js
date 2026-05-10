const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  
  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    // If token is expired, we treat as guest.
    // If token is tampered/invalid, we could reject or treat as guest.
    // For Traveloop, we treat any error as guest to ensure public trip access.
    if (err.name === 'TokenExpiredError') {
      return next();
    }
    
    // For other errors (JsonWebTokenError), we still proceed but without req.user.
    // This allows public access even with a broken token.
    next();
  }
};
