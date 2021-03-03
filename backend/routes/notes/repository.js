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
    db.query(`INSERT INTO notes SET userID=${userID} AND chartID=${chartID} AND dateAdded=CURDATE() AND note='${note}'`, callback);
}

module.exports = { viewAllNotes, addNote };