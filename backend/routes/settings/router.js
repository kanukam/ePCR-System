const express = require("express");
const router = express.Router();

const auth = require('../../middleware/auth');

const controller = require('./controller');

// These will be prefixed with /settings/ :
router.get("/:username", auth, controller.viewUser); // View user details
router.post("/admin", auth, controller.viewUsers); // View all users
router.post("/update", auth, controller.updateUser); // Update user account
router.post("/password", auth, controller.changePassword); // Change Password
router.post("/delete", auth, controller.deleteUser); // Delete User
module.exports = router;
