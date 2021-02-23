const mysql = require('mysql');

const con = mysql.createConnection({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

con.connect(err => {
    if (err){
        return console.log(err);
    }
    console.log("ePCR backend connected to DB");
    console.log("Checking tables...");

    con.query(`CREATE TABLE IF NOT EXISTS users (
        id INT(11) AUTO_INCREMENT, 
        username VARCHAR(255), 
        password VARCHAR(255), 
        email VARCHAR(255), 
        phone VARCHAR(12), 
        name VARCHAR(50), 
        PRIMARY KEY (id)
        )`, (err, res) => {
        if(err) return console.log(err);
        if(res.changedRows > 0) console.log("\t...'users' table created");
        else console.log("\t'users' table up to date.");
    });

    con.query(`CREATE TABLE IF NOT EXISTS charts (
        id INT(11) AUTO_INCREMENT, 
        date VARCHAR(45) NULL,
        incident TINYTEXT NULL DEFAULT NULL,
        location VARCHAR(45) NULL DEFAULT NULL,
        nature VARCHAR(45) NULL,
        disposition VARCHAR(45) NULL,
        destination VARCHAR(45) NULL,
        agency TINYTEXT NULL,
        trauma VARCHAR(45) NULL,
        mci VARCHAR(45) NULL,
        va VARCHAR(255) NULL,
        medications VARCHAR(45) NULL,
        procedures VARCHAR(45) NULL,
        notes MEDIUMTEXT NULL,
        patientID VARCHAR(45) NULL,
        userID VARCHAR(45) NULL,
        times TINYTEXT NULL DEFAULT NULL,
        PRIMARY KEY (id)
        )`, (err, res) => {
        if(err) return console.log(err);
        if(res.changedRows > 0) console.log("\t...'charts' table created/updated");
        else console.log("\t'charts' table up to date.");
    });

    con.query(`CREATE TABLE IF NOT EXISTS patients (
        id INT(11) AUTO_INCREMENT, 
        fname VARCHAR(255) NULL, 
        lname VARCHAR(255) NULL, 
        birth VARCHAR(45), 
        gender VARCHAR(10), 
        weight VARCHAR(10) NULL, 
        classify VARCHAR(45) NULL DEFAULT 'Adult', 
        bcolor VARCHAR(45) NULL, 
        address VARCHAR(255) NULL, 
        phone VARCHAR(12) NULL, 
        history MEDIUMTEXT NULL, 
        PRIMARY KEY (id)
        )`, (err, res) => {
        if(err) return console.log(err);
        if(res.changedRows > 0) console.log("\t...'patients' table created/updated");
        else console.log("\t'patients' table up to date.");
    });

    con.query(`CREATE TABLE IF NOT EXISTS notes (
        id INT(11) AUTO_INCREMENT, 
        patientID INT(11), 
        chartID INT(11), 
        userID INT(11), 
        body MEDIUMTEXT, 
        PRIMARY KEY (id)
        )`, (err, res) => {
        if(err) return console.log(err);
        if(res.changedRows > 0) console.log("\t...'notes' table created/updated");
        else console.log("\t'notes' table up to date.");
    });
});

module.exports = con;
