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
});

module.exports = con;
