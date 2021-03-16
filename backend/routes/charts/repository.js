// @ts-check
const db = require('../../sql/database');

function addChart(body, pbody, callback) {
    // insert into patient table first
    const sql = 'INSERT INTO patients SET ?';
    db.query(sql, pbody, (err, res) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        else {
            // if successful, save patient id
            var pid = res.insertId;
            body["patientID"] = pid;
            var sql = 'INSERT INTO charts SET ?';
            db.query(sql, body, (err, res) => {
                if (err) {
                    console.log(err);
                    callback(err);
                }
                else {
                    callback(null);
                }
            })
        }
    })
}

function addProcedure(body, callback) {
    var sql = 'INSERT INTO procedures SET ?';
    db.query(sql, body, (err, res) => {
        if (err) {
            console.log(err);
            callback(err);
        }
        else {
            callback(null);
        }
    });
}

function addMedication(body, callback) {
    var sql = 'INSERT INTO medications SET ?';
    db.query(sql, body, (err, res) => {
        if (err) {
            console.log(err);
            callback(err);
        }
        else {
            callback(null);
        }
    });
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

function viewPatientChart(id, callback){
    db.query(`SELECT * FROM patients LEFT JOIN charts ON charts.patientID = patients.id WHERE charts.id=${id}`, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
}

function viewAllPatientCharts(callback){
    db.query(`SELECT * FROM patients LEFT JOIN charts ON charts.patientID = patients.id`, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
}

module.exports = { viewChart, viewAllCharts, viewAllChartsFromPatientID, addChart, updateChart, addProcedure, addMedication, viewPatientChart, viewAllPatientCharts };