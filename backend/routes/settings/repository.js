const db = require('../../sql/database');

function viewUser(userName, callback){
    const sql = `SELECT users.name, users.email, users.phone FROM users WHERE username='${userName}'`
    console.log(sql);
    db.query(sql, (err, res) => {
      if (err){
          callback(err);
      }
      else {
          console.log("A");
        callback(err, res);
      }
    });
}

module.exports = {
    viewUser
}
