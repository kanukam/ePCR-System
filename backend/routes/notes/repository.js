// @ts-check
const db = require('../../sql/database');

function viewAllNotes(chartID, callback){
    db.query(`SELECT notes.id AS noteID, notes.note, notes.dateAdded, notes.name, notes.certifications, notes.chartID FROM notes INNER JOIN charts ON charts.id=${chartID}`, (err, res) => {
        return err
            ? callback(err)
            : callback(false, res);
    }) 
}

function addNote(username, chartID, note, date, certifications, callback){
    db.query(`INSERT INTO notes (name, chartID, dateAdded, note, certifications) values ('${username}', ${chartID}, '${date}', '${note}', '${certifications}')`, (err, res) => {
        return err
            ? callback(err)
            : callback(false, res);
    });
}

module.exports = { viewAllNotes, addNote };