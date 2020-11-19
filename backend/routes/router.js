//All url routes should be directed in this file
const express = require("express");
const router = express.Router();

const auth = require('../middleware/auth');

const controller = require('./controller');

// Will work for login page for now, can change later:
router.post("/login", controller.login)

router.get("/", (req, res) => {
  res.status(200).send("test");
});

router.get("/test-auth", auth, (req, res) => {
  res.status(200).send("If you can see this, you are authenticated");
});
