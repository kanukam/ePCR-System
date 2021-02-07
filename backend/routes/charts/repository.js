const db = require('../../sql/database');
const secret = process.env.JWT_SECRET;


function addChart(body, pbody, callback) {
    // insert into patient table first
    var sql = 'INSERT INTO patients SET ?';
    db.query(sql, pbody, (err, res) => {
        if (err) {
            return callback(err);
        }
        else {
            // if successful, save patient id
            pid = res.insertId;
            body["patientID"] = pid;
            var sql = 'INSERT INTO charts SET ?';
            db.query(sql, body, (err, res) => {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null);
                }
            })
        }
    })
}

function viewAllCharts(callback) {
    db.query('SELECT * FROM charts;', (err, results) => {
        if (err) {
            return callback(err );
        }
        callback(null, results);
    });
}

module.exports = { viewAllCharts, addChart};