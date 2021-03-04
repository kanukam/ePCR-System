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
        id INT(11) UNSIGNED AUTO_INCREMENT, 
        username VARCHAR(255), 
        password VARCHAR(255), 
        email VARCHAR(255), 
        phone VARCHAR(12), 
        name VARCHAR(50),
        privilege varchar(10) DEFAULT 'standard',
        PRIMARY KEY (id)
        )`, (err, res) => {
        if(err) return console.log(err);
        if(res.changedRows > 0) console.log("\t...'users' table created");
        else console.log("\t'users' table up to date.");
    });
    con.query(`CREATE TABLE IF NOT EXISTS charts (
        id INT(11) UNSIGNED AUTO_INCREMENT,
        incident_number VARCHAR(15) NULL,
        incident_date DATE NULL,
        location VARCHAR(45) NULL DEFAULT NULL,
        incident_address TINYTEXT NULL,
        disposition VARCHAR(45) NULL,
        agencies TINYTEXT NULL,
        patient_count VARCHAR(45) NULL,
        triage_color VARCHAR(45) NULL,
        dispatch_date_time DATETIME NULL,
        enroute_date_time DATETIME NULL,
        arrive_date_time DATETIME NULL,
        patient_contact_date_time DATETIME NULL,
        depart_date_time DATETIME NULL,
        transfer_date_time DATETIME NULL,
        unit_number VARCHAR(15) NULL,
        call_type VARCHAR(15) NULL,
        call_nature VARCHAR(15) NULL,
        care_level VARCHAR(10) NULL,
        destination VARCHAR(25) NULL,
        trauma_cause VARCHAR(30) NULL, 
        vehicle_accident_type VARCHAR(30) NULL,
        vehicle_accident_impact VARCHAR(15) NULL,
        vehicle_accident_safety_equipment VARCHAR(30) NULL,
        vehicle_accident_mph VARCHAR(15) NULL,
        vehicle_accident_ejected VARCHAR(15) NULL,
        medications VARCHAR(45) NULL,
        procedures VARCHAR(45) NULL,
        patientID VARCHAR(45) NULL,
        p_weight VARCHAR(10) NULL, 
        p_classify VARCHAR(45) NULL, 
        p_bcolor VARCHAR(45) NULL, 
        p_address VARCHAR(255) NULL, 
        p_phone VARCHAR(12) NULL, 
        p_history MEDIUMTEXT NULL, 
        PRIMARY KEY (id)
        )`, (err, res) => {
        if(err) return console.log(err);
        if(res.changedRows > 0) console.log("\t...'charts' table created/updated");
        else console.log("\t'charts' table up to date.");
    });

    con.query(`CREATE TABLE IF NOT EXISTS patients (
        id INT(11) UNSIGNED AUTO_INCREMENT, 
        fname VARCHAR(255) NULL, 
        lname VARCHAR(255) NULL, 
        birth DATE NULL, 
        gender VARCHAR(10), 
        PRIMARY KEY (id)
        )`, (err, res) => {
        if(err) return console.log(err);
        if(res.changedRows > 0) console.log("\t...'patients' table created/updated");
        else console.log("\t'patients' table up to date.");
    });

    con.query(`CREATE TABLE IF NOT EXISTS notes (
        id INT(11) UNSIGNED AUTO_INCREMENT, 
        patientID INT(11) UNSIGNED, 
        chartID INT(11) UNSIGNED, 
        userID INT(11) UNSIGNED, 
        body MEDIUMTEXT, 
        PRIMARY KEY (id)
        )`, (err, res) => {
        if(err) return console.log(err);
        if(res.changedRows > 0) console.log("\t...'notes' table created/updated");
        else console.log("\t'notes' table up to date.");
    });
});

module.exports = con;
