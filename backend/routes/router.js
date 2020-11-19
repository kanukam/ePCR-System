//All url routes should be directed in this file
const express = require("express");
const router = express.Router();

const auth = require('../middleware/auth');

const controller = require('./controller');

// Will work for login page for now, can change later:
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  
  if(!username || !password)
      return res.status(401).json({ error: 'Username or password field blank');
  
  controller.login(username, password, (err, accountFound, token) => {
    if (err){
      console.log(err);
      res.status(500).json({ error: 'Internal error please try again' });
    }
    else if (!accountFound)
      res.status(401).json({ error: 'Incorrect email or password' });
    else {
      res.cookie('token', token, { httpOnly: true })
        .sendStatus(200);
    }
  })
})

router.get("/", (req, res) => {
  res.status(200).send("test");
});
