const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  if(!req.cookies) 
    return res.status(401).send('401: Unauthorized. No cookie provided');
    
  const token = req.cookies.token;

  if(!token)
    res.status(401).send('401: Unauthorized. No token provided');
  else{
    jwt.verify(token, secret, (err, decoded) => {
      if(err)
        res.status(401).send('401: Unauthorized. Invalid token');
      else{
        req.user = decoded;
        next();
      }
    });
  }
}

module.exports = auth;
