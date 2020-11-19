//All url routes should be directed in this file
const express = require("express");
const router = express.Router();

const auth = require('../middleware/auth');

router.get("/", (req, res) => {
  res.status(200).send("test");
});
