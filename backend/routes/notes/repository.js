// @ts-check
const db = require('../../sql/database');

function viewAllNotes(chartID, callback){
    db.query(`SELECT notes.id AS noteID, note, dateAdded, name, chartID FROM notes LEFT JOIN users ON notes.userID = users.id where chartID=${chartID}`, (err, res) => {
        return err
            ? callback(err)
            : callback(false, res);
    }) 
}

function addNote(userID, chartID, note, callback){
    db.query(`INSERT INTO notes (userID, chartID, dateAdded, note) values (${userID}, ${chartID}, CURDATE(), '${note}')`, (err, res) => {
        return err
            ? callback(err)
            : callback(false, res);
    });
}

module.exports = { viewAllNotes, addNote };