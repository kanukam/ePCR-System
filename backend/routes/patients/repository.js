const db = require('../../sql/database');

function addPatient(userID, body, callback){
    const bodyWithID = { ...body, userID };
    const sql = 'INSERT INTO patients SET ?'
    db.query(sql, bodyWithID, (err, res) => {
      if (err)
        callback(err);
      else {
        let pid = res.insertId;
        callback(false, pid);
      }
    });
}

function getPatient(id, userID, callback){
    db.query(`SELECT * FROM patients WHERE (id=${id} AND userID=${userID})`, (err, results) => {
        if (err) 
            callback(err);
        else 
            callback(false, results[0]);
      });
}

function updatePatient(patientID, userID, body, callback){
    const sql = `UPDATE patients SET ? WHERE (id=${patientID} AND userID=${userID})`
    db.query(sql, body, err => {
        callback(err);
    })
}

function getAllPatients(userID, callback){
    /*db.query(`SELECT * FROM patients WHERE userID=${userID}`, (err, results) => {
        if(err)
            callback(err);
        else callback(false, results);
      });*/
      db.query(`SELECT * FROM patients`, (err, results) => {
        if(err)
            callback(err);
        else callback(false, results);
      });
}

module.exports = {
    addPatient,
    getPatient,
    getAllPatients,
    updatePatient
}
