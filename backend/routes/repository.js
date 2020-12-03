const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');

const db = require('../sql/database');

// Can change this later, but will for now work with a login form:
function login(username, typedPassword, callback){
    // Callback : callback(error, passwordMismatch?, token)
    db.query(`SELECT * from users WHERE username='${username}'`, // !!! SET UP DATABASE AND THEN CHANGE THIS
      (err, res) => {
          if(err) 
              return callback(err);
          if(res.length === 0) // No rows found
              return callback("404: Account does not exist.");
              
          const { username, password, id } = res[0]; // 'password' is the hashed password
          bcrypt.compare(typedPassword, password, // we must hash 'typedPassword' and compare it to 'password' via the bcrypt compare function
            (err, auth) => {
                if(err)
                    callback(err);
                else if(auth){ // Success, password match
                    // We put 'username' in the cookie so we can decode it later for authentication.
                    const token = jwt.sign({ username, id }, jwtSecret, { expiresIn: 86400 }); 
                    callback(null, true, token);
                }
                else
                    callback(null, false);
            });
      });
}

function register(username, typedPassword, typedEmail, phone, name){
    // Check database for existence of email
    db.query(`SELECT * from users WHERE email='${typedEmail}'`,
        (err, res) => {
            if(err)
                return callback(err)
            // Email doesn't exist in database
            if(res.length === 0){
                return callback("404: Account is not authorized for creation");
            }
            const { password } = res[0];
            // If password exists for email in database, email is already registered
            if(password)
                return callback("401: Account is unauthorized for registering again");
            bcrypt.hash(typedPassword, 10, (err, hash) => {
                if(err)
                    return callback(err);
                createAccount(username, hash, typedEmail, phone, name, err => {
                    callback(err);  
                })
                 
            }) 
        })
    }

function createAccount(username, hash, email, phone, name, callback){
    //Optional Fields
    phone = phone || null;
    name = name || null;
    let sql = 'UPDATE users SET username = ?, password = ?, phone = ?, name = ? WHERE email = ?';
    
    // Insert user information into database
    db.query(sql, [username, hash, phone, name, email], err => {
        callback(err);
    })
}

module.exports = {
    register,
    login
}
