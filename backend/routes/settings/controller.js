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

// Get all users account information
function viewUsers(req, response) {
  // Check if the user is viewing their own account info
  if (req.user.privilege == "admin") {
    repo.viewUsers((err, res) => {
      err
        ? response.status(500).json({ error: "Internal Server Error, try again" })
        : response.status(200).json({ userInfo: res });
    })
  }
  else {
    response.status(401).json({ status: "unauthorized" });
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

// Update user account information
function changePassword(req, res) {
  // Mandatory Fields
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword){
    return res.status(401).json({ error: 'Password fields are blank' });
  }
  repo.changePassword(req.user.username, oldPassword, newPassword, (err, passwordMismatch) => {
    if(err){
      res.status(500).json({ error: "Internal Server Error, try again" })
    }
    else if(passwordMismatch)
    {
      res.status(401).json({ status: "unauthorized" });
    }
    else
    {
      res.status(200).json({ status: "success" });
    }
  })
}

// Update user account information
function deleteUser(req, res) {
  const { email } = req.body;
  if (req.user.privilege == "admin") {
    repo.deleteUser(email, (err, data) => {
      err
        ? res.status(500).json({ error: "Internal Server Error, try again" })
        : res.status(200).json({ userInfo: data });
    })
  }
  else {
    res.status(401).json({ status: "unauthorized" });
  }

}

  module.exports = { viewUser, updateUser, changePassword, viewUsers, deleteUser };