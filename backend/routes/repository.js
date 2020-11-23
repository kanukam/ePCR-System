const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');

const db = require('../sql/database');

// Can change this later, but will for now work with a login form:
module.exports.login = (username, typedPassword, callback) => {
    // Callback : callback(error, passwordMismatch?, token)
    db.query(`SELECT * from users WHERE username='${username}'`, // !!! SET UP DATABASE AND THEN CHANGE THIS
      (err, res) => {
          if(err) 
              return callback(err);
          if(res.length === 0) // No rows found
              return callback("404: Account does not exist.");
              
          const { username, password } = res[0]; // 'password' is the hashed password
          bcrypt.compare(typedPassword, password, // we must hash 'typedPassword' and compare it to 'password' via the bcrypt compare function
            (err, auth) => {
                if(err)
                    callback(err);
                else if(auth){ // Success, password match
                    // We put 'username' in the cookie so we can decode it later for authentication.
                    const token = jwt.sign({ username }, jwtSecret, { expiresIn: 86400 }); 
                    callback(null, true, token);
                }
                else
                    callback(null, false);
            });
      });
}
