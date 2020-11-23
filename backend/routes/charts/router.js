const express = require("express");
const router = express.Router();

const auth = require('../../middleware/auth');

const controller = require('./controller');

router.get("/charts", auth, controller.viewAllCharts); // View all charts

router.post("/charts/add", auth, controller.addChart);

module.exports = router;
