const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require("http")
require('dotenv').config(); // Loads variables from .env file into process.env object

const port = process.env.PORT || 3000; // localhost:3000 unless specified otherwise.

const app = express();
const router = require("./routes/router");

app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
app.use(bodyParser.json()); // Be able to read the json body of POST requests
app.use(cookieParser()); // Use cookieparser to read cookies for authentication.
app.use(router); // Use /routes/router.js

const server = http.createServer(app);

server.listen(port, () => console.log(`ePCR backend listening on port ${port}`));
