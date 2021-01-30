const db = require('../../sql/database');

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

module.exports = {
    viewUser, updateUser
}
