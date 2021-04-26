const repo = require('./repository');

// Can change this later, but will for now work with a login form:
function login(req, res){
  const { username, password } = req.body;
  
  if(!username || !password)
      return res.status(401).json({ error: 'Username or password field blank'});
  
  repo.login(username, password, (err, passwordMismatch, token) => {
    if (err){
      res.status(500).json({ error: 'Internal error please try again' });
    }
    else if (!passwordMismatch)
      res.status(401).json({ error: 'Incorrect password' });
    else
      res.cookie('token', token, { httpOnly: true }).sendStatus(200);
  })
}

function logout(req, res){
  res.cookie("token", "", { httpOnly: true }).clearCookie("token").sendStatus(200);
}

function forgot(req, res){
  const {email} = req.body;
  if(!email){
    return res.status(401).json({ error: 'Email is blank' });
  }
  repo.forgot(email, (err) => {
    err
      ? res.status(500).json({ error: "Internal Server Error, try again" })
      : res.status(200).json({status: "Success"});
  })
}

function changePassword(req, res) {
  const { password, token } = req.body;
  if (!password || !token) {
    return res.status(401).json({ error: 'Invalid' });
  }
  repo.changePassword(password, token, (err) => {
    err
      ? res.status(500).json({ error: "Internal Server Error, try again" })
      : res.status(200).json({ status: "Success" });
  })
}

function register(req, res) {
  const { username, password, email, phone, name } = req.body;
  // Mandatory Fields
  if (!username || !password || !email)
    return res.status(401).json({ error: 'Username, password, or email field are blank' });

  repo.register(username, password, email, phone, name, (err, duplicate) => {
    if (err) {
      res.status(500).json({ error: 'Internal error please try again' });
    }
    else if(duplicate){
      res.status(401).json({ error: 'Username already exists' });
    }
    else {
      res.status(200).json({ status: 'Successful registration' });
    }
  })
}

function testAuth(req, res){
  console.log("A")
  res.status(200).send("If you can see this, you are authenticated");
}

function getUsername(req, res){
  const { username, privilege} = req.user;
  res.status(200).json({ username, privilege});
}



module.exports = {
  login,
  logout,
  register,
  testAuth,
  getUsername,
  forgot,
  changePassword
}
