const express = require("express");
const router = express.Router();

const auth = require('../../middleware/auth');

const controller = require('./controller');

// These will be prefixed with /users/ :
router.get("/:username", auth, controller.viewUser); // View user details
router.get("/:username/remove", auth, controller.deleteSelf); // Delete self
router.post("/:username/update", auth, controller.updateUser); // Update user account
router.post("/:username/password", auth, controller.changePassword); // Change Password
router.post("/:username/delete", auth, controller.deleteUser); // Delete User
router.post("/:username/add", auth, controller.addUser); // Add User
router.post("/:username/elevate", auth, controller.elevateUser); // Elevate User
router.post("/", auth, controller.viewUsers); // View all users

module.exports = router;
