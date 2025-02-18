const jwt = require('jsonwebtoken');

module.exports.secureRoute = (req, res, next) => {
  const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];  
  
  if (!token) {
    console.log("No token found");
    return res.status(401).json({ msg: 'No token provided' });
  }
  // console.log(token)
  try {
    const decoded = jwt.verify(token, 'mysecrettoken');  
    // console.log("Decoded user:", decoded);  
  

    req.user = decoded;
    // console.log("aa gye")
    next();  
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(401).json({ msg: 'Invalid or expired token' });
  }
};


