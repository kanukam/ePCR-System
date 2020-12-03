const db = require('../../sql/database');
const secret = process.env.JWT_SECRET;

module.exports.insert = (myno, mytype, mydate, mypatient, callback) => {
    //Optional Fields
    myno = myno || null;
    mytype = mytype || null;
    mydate = mydate || null;
    mypatient = mypatient || null;
    var body = {no: myno, type: mytype, date: mydate, patient: mypatient};
    var sql = 'INSERT INTO charts SET ?';
    let query = db.query(sql, body, (err, result) => {
        if (err) throw err;
            //return callback(err)
        else console.log(result);
            //callback(null, true)
    })
}

// Get ID of current user
module.exports.getId = (username, callback) => {
    
    db.query(`SELECT * from users WHERE username='${username}'`,
        (err, res) => {
            if (err)
            {
                return callback(err);
            }
            // No rows found
            if(res.length === 0)
            {
                return callback("404: Account does not exist.");
            }
            // User id of user
            const { id } = res[0];
            if(id)
            {
                return callback(null, id);
            }
        });
}