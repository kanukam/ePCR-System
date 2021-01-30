const repo = require('./repository');

// Get user account information
function viewUser(req, response) {
  // Check if the user is viewing their own account info
  if(req.user.username === req.params.username){
    repo.viewUser(req.user.username, (err, res) => {
      err
        ? response.status(500).json({ error: "Internal Server Error, try again" })
        : response.status(200).json({ userInfo: res });
    })
  }
  else{
    response.status(401).json({ status: "unauthorized"});
  }
}

// Update user account information, post request
function updateUser(req, response) {
  const { name, email, phone} = req.body;
  // Mandatory Fields
  if (!name || !email || !phone)
    return res.status(401).json({ error: 'Username, password, or email field are blank' });

  if (req.user.username) {
    repo.updateUser(req.user.username, name, phone, email, (err, res) => {
      err
        ? response.status(500).json({ error: "Internal Server Error, try again" })
        : response.status(200).json({ status: "success" })
    })
  }
  else {
    response.status(401).json({ status: "unauthorized" });
  }
}

module.exports = { viewUser, updateUser };
