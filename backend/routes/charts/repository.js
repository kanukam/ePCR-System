// @ts-check
const db = require('../../sql/database');

function addChart(body, pbody, callback) {
    console.log(pbody);
    // insert into patient table first
    const sql = 'INSERT INTO patients SET ?';
    db.query(sql, pbody, (err, res) => {
        if (err) {
            return callback(err);
        }
        else {
            // if successful, save patient id
            var pid = res.insertId;
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

function updateChart(userID, chartID, patientID, body, callback){
    db.query(`UPDATE charts SET ?
    WHERE (userID=${userID} AND id=${chartID} AND patientID=${patientID})`, body, callback);
}

function viewAllNotes(chartID, patientID, callback){
    db.query(`SELECT * FROM notes where (chartID=${chartID} AND patientID=${patientID})`, (err, res) => {
        return err
            ? callback(err)
            : callback(false, res);
    }) 
}

function addNote(chartID, patientID, note, callback){
    db.query(`INSERT INTO notes SET patientID=${patientID} AND chartID=${chartID} AND body='${note}'`, callback);
}

module.exports = { viewChart, viewAllCharts, viewAllChartsFromPatientID, viewAllNotes, addNote, addChart, updateChart };