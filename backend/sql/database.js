const mysql = require('mysql');

const con = mysql.createConnection({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

con.connect(err => {
    if (err) {
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
        if (err) return console.log(err);
        if (res.changedRows > 0) console.log("\t...'users' table created");
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
        medications VARCHAR(500) NULL,
        procedures VARCHAR(45) NULL,
        skin VARCHAR(500) NULL,
        mental VARCHAR(500) NULL,
        neurological VARCHAR(500) NULL,
        head VARCHAR(500) NULL,
        neck VARCHAR(500) NULL,
        chest VARCHAR(500) NULL,
        pulse_strength TINYTEXT NULL,
        pulse_rate TINYTEXT NULL,
        abdomen VARCHAR(500) NULL,
        pelvis VARCHAR(500) NULL,
        back VARCHAR(500) NULL,
        left_upper_arm VARCHAR(500) NULL,
        left_lower_arm VARCHAR(500) NULL,
        left_hand_wrist VARCHAR(500) NULL,
        left_upper_leg VARCHAR(500) NULL,
        left_lower_leg VARCHAR(500) NULL,
        left_ankle_foot VARCHAR(500) NULL,
        right_upper_arm VARCHAR(500) NULL,
        right_lower_arm VARCHAR(500) NULL,
        right_hand_wrist VARCHAR(500) NULL,
        right_upper_leg VARCHAR(500) NULL,
        right_lower_leg VARCHAR(500) NULL,
        right_ankle_foot VARCHAR(500) NULL,
        extra_findings MEDIUMTEXT NULL,
        stroke_time VARCHAR(15) NULL,
        stroke_facial_droop VARCHAR(15) NULL,
        stroke_arm_drift VARCHAR(15) NULL,
        stroke_abnormal_speech VARCHAR(15) NULL,
        vital_signs MEDIUMTEXT NULL,
        patientID VARCHAR(45) NULL,
        p_weight VARCHAR(10) NULL,
        p_classify VARCHAR(45) NULL,
        p_bcolor VARCHAR(45) NULL,
        p_address VARCHAR(255) NULL,
        p_phone VARCHAR(12) NULL,
        p_hpi MEDIUMTEXT NULL,
        p_history_given VARCHAR(255) NULL,
        p_medical_allergies TINYTEXT NULL,
        p_environmental_allergies TINYTEXT NULL,
        p_past_medical_history MEDIUMTEXT NULL,
        PRIMARY KEY (id)
        )`, (err, res) => {
        if (err) return console.log(err);
        if (res.changedRows > 0) console.log("\t...'charts' table created/updated");
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
        if (err) return console.log(err);
        if (res.changedRows > 0) console.log("\t...'patients' table created/updated");
        else console.log("\t'patients' table up to date.");
    });

    con.query(`CREATE TABLE IF NOT EXISTS notes (
        id INT(11) UNSIGNED AUTO_INCREMENT, 
        patientID INT(11) UNSIGNED, 
        chartID INT(11) UNSIGNED, 
        userID INT(11) UNSIGNED, 
        dateAdded DATE,
        note MEDIUMTEXT, 
        PRIMARY KEY (id)
        )`, (err, res) => {
        if (err) return console.log(err);
        if (res.changedRows > 0) console.log("\t...'notes' table created/updated");
        else console.log("\t'notes' table up to date.");
    });

    con.query(`CREATE TABLE IF NOT EXISTS procedures (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NULL,
        time DATE NULL,
        location VARCHAR(255) NULL,
        type VARCHAR(255) NULL,
        size VARCHAR(255) NULL,
        tube VARCHAR(225) NULL,
        needle VARCHAR(225) NULL,
        fluid VARCHAR(225) NULL,
        result VARCHAR(255) NULL,
        delivery VARCHAR(255) NULL,
        amount VARCHAR(255) NULL,
        adjuncts VARCHAR(255) NULL,
        physician VARCHAR(255) NULL,
        orders VARCHAR(255) NULL,
        teeth VARCHAR(255) NULL,
        confirm VARCHAR(255) NULL,
        findings VARCHAR(255) NULL,
        rhythm VARCHAR(255) NULL,
        mode VARCHAR(255) NULL,
        rate VARCHAR(255) NULL,
        output VARCHAR(255) NULL,
        capture VARCHAR(255) NULL,
        cprStart DATETIME NULL,
        cprStop DATETIME NULL,
        outcome VARCHAR(255) NULL,
        effective VARCHAR(45) NULL,
        energy VARCHAR(45) NULL,
        converted VARCHAR(255) NULL,
        pulseCapture VARCHAR(255) NULL,
        patientID VARCHAR(45) NULL,
        userID VARCHAR(45) NULL,
        PRIMARY KEY (id)
    )`, (err, res) => {
        if (err) return console.log(err);
        if (res.changedRows > 0) console.log("\t...'procedures' table created/updated");
        else console.log("\t'procedures' table up to date.");
    });

    con.query(`CREATE TABLE IF NOT EXISTS medications (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NULL,
        time DATETIME NULL,
        dosage VARCHAR(45) NULL,
        unit VARCHAR(255) NULL,
        route VARCHAR(255) NULL,
        patientID VARCHAR(45) NULL,
        userID VARCHAR(45) NULL,
        PRIMARY KEY (id)
    )`, (err, res) => {
        if (err) return console.log(err);
        if (res.changedRows > 0) console.log("\t...'medications' table created/updated");
        else console.log("\t'medications' table up to date.");
    });
});

module.exports = con;