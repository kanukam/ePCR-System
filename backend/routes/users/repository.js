const db = require('../../sql/database');
const bcrypt = require('bcrypt');

function viewUser(userName, callback){
    const sql = `SELECT users.name, users.email, users.phone FROM users WHERE username='${userName}'`;
    db.query(sql, (err, res) => {
      if (err){
          callback(err);
      }
      else {
        callback(err, res);
      }
    });
}

function viewUsers(callback) {
    const sql = 'SELECT users.name, users.email, users.phone, users.username, users.privilege FROM users';
    db.query(sql, (err, res) => {
        if (err) {
            callback(err);
        }
        else {
            callback(err, res);
        }
    });
}

function updateUser(username, name, phone, email, callback) {
    const sql = 'UPDATE users SET users.name = ?, users.phone = ?, users.email = ? WHERE username = ?';
    db.query(sql, [name, phone, email, username], (err, res) => {
        if (err) {
            callback(err);
        }
        else {
            callback(err, res);
        }
    });
}


// Update user account information
function changePassword(username, oldPassword, newPassword, callback) {
    //
    db.query(`SELECT * from users WHERE username='${username}'`,
        (err, res) => {
            if (err)
                return callback(err);
            if (res.length === 0) // No rows found
                return callback("404: Account does not exist.");
            //Hashed password
            const { password } = res[0]; 
            // Comparing hashed password with new password
            bcrypt.compare(oldPassword, password,
                (err, auth) => {
                    if (err){
                        return callback(err);
                    }
                    else if (auth) 
                    { 
                        // Hash and set new password
                        bcrypt.hash(newPassword, 10, (err, hash) => {
                            if (err)
                            {
                                return callback(err);
                            }
                            let sql = 'UPDATE users SET password = ? WHERE username = ?';
                            // Update password
                            db.query(sql, [hash, username], err => {
                                if(err){
                                    return callback(err);
                                }
                                else{
                                    return callback(null, false);
                                }
                            })
                        })
                    }
                    else
                    {
                        return callback(null, true);
                    }
                })
            })
        }    
                    
// Update user account information
function deleteUserByUsername(username, callback) {
    db.query(`DELETE from users WHERE username='${username}'`, (err, res) => { 
        if (err) {
            callback(err);
        }
        else {
            const sql = 'SELECT users.name, users.email, users.phone, users.username, users.privilege FROM users';
            db.query(sql, (err, res) => {
                if (err) {
                    callback(err);
                }
                else {
                    callback(err, res);
                }
            });
        }
    })
}

function deleteUserByEmail(email, callback) {
    db.query(`DELETE from users WHERE email='${email}'`, (err, res) => { 
        if (err) {
            callback(err);
        }
        else {
            const sql = 'SELECT users.name, users.email, users.phone, users.username, users.privilege FROM users';
            db.query(sql, (err, res) => {
                if (err) {
                    callback(err);
                }
                else {
                    callback(err, res);
                }
            });
        }
    })
}

function addUser(email, callback) { // Guarantee Username isnt in database
    db.query(`SELECT * from users WHERE email='${email}'`,
        (err, res) => {
            if (err) {
                return callback(err)
            }
            // email exists in database
            if (res.length != 0) {
                return callback(null, true);
            }
            db.query('INSERT INTO users (email) VALUES (?)', [email],
                (err, res) => {
                    if (err) {
                        return callback(err)
                    }
                    else{
                        const sql = 'SELECT users.name, users.email, users.phone, users.username, users.privilege FROM users';
                        db.query(sql, (err, res) => {
                            if (err) {
                                callback(err);
                            }
                            else {
                                callback(err, false, res);
                            }
                        });
                    }
                });
        });
}

module.exports = {
    viewUser, 
    updateUser, 
    changePassword, 
    viewUsers, 
    deleteUserByUsername,
    deleteUserByEmail,
    addUser
}
