const db = require('../../sql/database');

function addChart(body, pbody, callback) {
    // insert into patient table first
    const sql = 'INSERT INTO patients SET ?';
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
    db.query('SELECT * FROM charts', (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
}

function viewChart(id, callback){
    db.query(`SELECT * FROM charts where id=${id}`, (err, res) => {
        return err
            ? callback(err)
            : callback(false, res[0]);
    })
}

function viewAllChartsFromPatientID(patientID, callback){
    db.query(`SELECT * FROM charts where patientID=${patientID}`, (err, res) => {
        return err
            ? callback(err)
            : callback(false, res);
    }) 
}

module.exports = { viewChart, viewAllCharts, viewAllChartsFromPatientID, addChart};