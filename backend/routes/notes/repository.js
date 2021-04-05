// @ts-check
const db = require('../../sql/database');

function viewAllNotes(chartID, callback){
    db.query(`SELECT notes.id AS noteID, note, dateAdded, name, chartID FROM notes LEFT JOIN users ON notes.username = users.username where chartID=${chartID}`, (err, res) => {
        return err
            ? callback(err)
            : callback(false, res);
    }) 
}

function addNote(username, chartID, note, callback){
    db.query(`INSERT INTO notes (username, chartID, dateAdded, note) values ('${username}', ${chartID}, NOW(), '${note}')`, (err, res) => {
        return err
            ? callback(err)
            : callback(false, res);
    });
}

module.exports = { viewAllNotes, addNote };