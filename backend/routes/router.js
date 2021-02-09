//All url routes should be directed in this file
const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');

const controller = require('./controller');

const charts = require('./charts/router');
const patients = require('./patients/router');
const users = require('./users/router');

router.use('/charts', charts);

router.use('/patients', patients);

router.use('/users', users);

// Will work for login page for now, can change later:
router.post("/login", controller.login);

router.post("/register", controller.register); // Register user

router.get("/test-auth", auth, controller.testAuth);

router.get("/getUsername", auth, controller.getUsername);

router.get("/", (req, res) => {
  res.status(200).send("test");
});

module.exports = router;
