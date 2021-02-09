const express = require("express");
const router = express.Router();

const auth = require('../../middleware/auth');

const controller = require('./controller');

// These will be prefixed with /users/ :
router.get("/:username", auth, controller.viewUser); // View user details
router.post("/:username/update", auth, controller.updateUser); // Update user account
router.post("/:username/password", auth, controller.changePassword); // Change Password
router.post("/:username/delete", auth, controller.deleteUser); // Delete User
router.post("/", auth, controller.viewUsers); // View all users

module.exports = router;
