//All url routes should be directed in this file
const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');

const controller = require('./controller');

const charts = require('./charts/router');

router.use('/charts', charts);

// Will work for login page for now, can change later:
router.post("/login", controller.login)

router.get("/test-auth", auth, controller.testAuth);

router.get("/", (req, res) => {
  res.status(200).send("test");
});

module.exports = router;
