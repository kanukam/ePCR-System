const repo = require('./repository');

// Can change this later, but will for now work with a login form:
function login(req, res){
  const { username, password } = req.body;
  
  if(!username || !password)
      return res.status(401).json({ error: 'Username or password field blank'});
  
  repo.login(username, password, (err, passwordMismatch, token) => {
    if (err){
      console.log(err);
      res.status(500).json({ error: 'Internal error please try again' });
    }
    else if (!passwordMismatch)
      res.status(401).json({ error: 'Incorrect password' });
    else
      res.cookie('token', token, { httpOnly: true }).sendStatus(200);
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
  res.status(200).send("If you can see this, you are authenticated");
}

function getUsername(req, res){
  let username = req.user['username'];
  res.json(username);
}

module.exports = {
  login,
  register,
  testAuth,
  getUsername
}
