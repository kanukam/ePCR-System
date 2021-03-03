// @ts-check
const db = require('../../sql/database');

function viewAllNotes(userID, chartID, callback){
    db.query(`SELECT * FROM notes where (chartID=${chartID} AND userID=${userID})`, (err, res) => {
        return err
            ? callback(err)
            : callback(false, res);
    }) 
}

function addNote(userID, chartID, note, callback){
    db.query(`INSERT INTO notes (userID, chartID, dateAdded, note) values (${userID}, ${chartID}, CURDATE(), '${note}');`, callback);
}

module.exports = { viewAllNotes, addNote };