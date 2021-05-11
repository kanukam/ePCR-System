const express = require("express");
const upload = require('express-fileupload');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require("http");
require('dotenv').config(); // Loads variables from .env file into process.env object
const port = process.env.PORT || 3000; // localhost:3000 unless specified otherwise.
const cors = require('cors');
const app = express();
const router = require("./routes/router");
app.use(upload({ preserveExtension: true }));
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
app.use(bodyParser.json()); // Be able to read the json body of POST requests
app.use(cookieParser()); // Use cookieparser to read cookies for authentication.
app.use(cors({
  origin: 'http://localhost:3001',  // Example React server
  credentials: true
}));
app.use('/api', router); // Use /routes/router.js
const server = http.createServer(app);

server.listen(port, (err) => {
  err?
    console.log("ERROR") :
    console.log(`ePCR backend listening on port ${port}`);
});
