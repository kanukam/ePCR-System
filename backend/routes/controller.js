const repo = require('./repository');

// Can change this later, but will for now work with a login form:
module.exports.login = (req, res) => {
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

module.exports.testAuth = (req, res) => {
  res.status(200).send("If you can see this, you are authenticated");
}
