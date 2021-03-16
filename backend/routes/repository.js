const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const siteEmail = process.env.EMAIL;
const emailPassword = process.env.EMAIL_PASSWORD;
const frontendUrl = process.env.FRONTEND_HOST_URL;
const bcrypt = require('bcrypt');
const db = require('../sql/database');
const nodemailer = require('nodemailer');
const mailConnection = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: siteEmail,
        pass: emailPassword
    }
})

// Can change this later, but will for now work with a login form:
function login(username, typedPassword, callback){
    // Callback : callback(error, passwordMismatch?, token)
    db.query(`SELECT * from users WHERE username='${username}'`, // !!! SET UP DATABASE AND THEN CHANGE THIS
      (err, res) => {
          if(err) 
              return callback(err);
          if(res.length === 0) // No rows found
              return callback("404: Account does not exist.");
              
          const { username, password, id, privilege } = res[0]; // 'password' is the hashed password
          bcrypt.compare(typedPassword, password, // we must hash 'typedPassword' and compare it to 'password' via the bcrypt compare function
            (err, auth) => {
                if(err)
                    callback(err);
                else if(auth){ // Success, password match
                    // We put 'username' in the cookie so we can decode it later for authentication.
                    const token = jwt.sign({ username, id, privilege}, jwtSecret, { expiresIn: 86400 }); 
                    callback(null, true, token);
                }
                else
                    callback(null, false);
            });
      });
}

function register(username, typedPassword, typedEmail, phone, name, callback){
    // Guarantee Username isnt in database
    db.query(`SELECT * from users WHERE username='${username}'`,
        (err, res) => {
            if (err){
                return callback(err)
            }
            // username exists in database
            if (res.length != 0) {
                return callback(null, true);
            }
            // Check database for existence of email
            db.query(`SELECT * from users WHERE email='${typedEmail}'`,
                (err, res) => {
                    if (err) {
                        return callback(err)
                    }
                    // Email doesn't exist in database
                    if (res.length === 0) {
                        return callback("404: Account is not authorized for creation");
                    }
                    const { password } = res[0];
                    // If password exists for email in database, email is already registered
                    if (password)
                        return callback("401: Account is unauthorized for registering again");
                    bcrypt.hash(typedPassword, 10, (err, hash) => {
                        if (err)
                            return callback(err);
                        createAccount(username, hash, typedEmail, phone, name, err => {
                            if (err)
                                return callback(err);
                            else
                                callback(null, false);
                        })

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

function forgot(email, callback) {
    db.query(`SELECT * from users WHERE email='${email}'`,
        (err, res) => {
            if (err) {
                return callback(err)
            }
            // email exists in database, send email with link
            if (res.length != 0) {
                // Link will work for an hour
                const token = jwt.sign({ email }, jwtSecret, { expiresIn: 3600 });
                // Change later when domain established
                const link = `${frontendUrl}Reset/${token}`
                const mailOptions = {
                    from: siteEmail,
                    to: email,
                    subject: "ePCR System - Reset Password",
                    html: `<a href=${link}> Reset Password </a><br><p>Expires in 1 hour</p>`
                }
                mailConnection.sendMail(mailOptions, (err) => {
                    err
                        ? callback("Error")
                        : callback(null);;
                })
            }
            else{
                return callback(true);
            }
        });
}

function changePassword(password, token, callback) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err)
            callback('401: Unauthorized. Invalid token');
        else {
            const {email} = decoded;
            // Hash and set new password
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return callback(err);
                }
                let sql = 'UPDATE users SET password = ? WHERE email = ?';
                // Update password
                db.query(sql, [hash, email], err => {
                    if (err) {
                        return callback(err);
                    }
                    else {
                        return callback(null);
                    }
                })
            })
        }
    });
}

module.exports = {
    register,
    login,
    changePassword,
    forgot,
}
