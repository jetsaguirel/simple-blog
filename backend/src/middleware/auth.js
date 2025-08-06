const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    console.log('Auth middleware - token received:', token ? 'Yes' : 'No');
    
    if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret-key');
    console.log('Auth middleware - decoded token:', decoded);
    
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      console.log('Auth middleware - user not found for ID:', decoded.userId);
      return res.status(401).json({ error: 'Token is not valid' });
    }

    console.log('Auth middleware - user found:', { id: user._id, name: user.name, email: user.email });
    req.user = user;
    next();
  } catch (error) {
    console.log('Auth middleware - error:', error.message);
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = auth;
