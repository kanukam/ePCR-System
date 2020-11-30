const db = require('../../sql/database');

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