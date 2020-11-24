const db = require('../../sql/database');
const bcrypt = require('bcrypt');

module.exports.register = (typedEmail, typedPassword, callback) => {
    // Check database for existence of email
    db.query(`SELECT * from users WHERE email='${typedEmail}'`,
        (err, res) => {
            if (err)
                return callback(err)
            // Email doesn't exist in database
            if (res.length === 0)
            {
                return callback("404: Account is not authorized for creation");
            }
            const { email, password } = res[0];
            // If password exists for email in database, email is already registered
            if (password)
                return callback("401: Account is unauthorized for registering again");

            bcrypt.hash(typedPassword, 10, (err, hash) => {
                if(err)
                    callback(err);
                else
                    callback(null, hash);
            })
        })
    }

module.exports.insert = (username, hash, email, phone, name, callback) => {
    //Optional Fields
    phone = phone || null;
    name = name || null;
    var sql = 'UPDATE users SET username = ?, password = ?, phone = ?, name = ? WHERE email = ?';
    
    // Insert user information into database
    db.query(sql,[username, hash, phone, name, email], (err, result) => {
        if (err)
            return callback(err)
        else
            callback(null, true)
    })
}