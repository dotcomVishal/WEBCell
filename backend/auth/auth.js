const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ error: 'token not given' });
  }

  try {
    //split string at space to get token
    const token = authHeader.split(' ')[1]; 
    
    
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    
    req.user = verified;
    next(); 
    
  } catch (err) {
    res.status(400).json({ error: 'wrong token' });
  }
};

module.exports = verifyToken;