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
    //User table for testing
    /*
    var sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), email VARCHAR(255), phone VARCHAR(12), name VARCHAR(50))"; 
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
    */
});

module.exports = con;
