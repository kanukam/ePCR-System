const repo = require('./repository');

// Get user account information
function viewUser(req, response) {
  const { username } = req.params;
  // Check if the user is viewing their own account info
  if(req.user.username === username){
    repo.viewUser(req.user.username, (err, res) => {
      err
        ? response.status(500).json({ error: "Internal Server Error, try again" })
        : response.status(200).json({ userInfo: res });
    })
  }
  // Allow admin to view other users
  else if(req.user.privilege === "admin") {
    repo.viewUser(username, (err, res) => {
      err
        ? response.status(500).json({ error: "Internal Server Error, try again" })
        : response.status(200).json({ userInfo: res });
    })  
  }
  else {
    response.status(401).json({ status: "unauthorized"});
  }
}

// Get all users account information
function viewUsers(req, response) {
  // Check if the user is viewing their own account info
  if (req.user.privilege === "admin") {
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
  const { username } = req.params;
  const { name, email, phone} = req.body;
  // Mandatory Fields
  if (!name || !email || !phone)
    return res.status(401).json({ error: 'Username, password, or email field are blank' });

  if (username) {
    repo.updateUser(username, name, phone, email, (err, res) => {
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
  const { username } = req.params;
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword){
    return res.status(401).json({ error: 'Password fields are blank' });
  }
  repo.changePassword(username, oldPassword, newPassword, (err, passwordMismatch) => {
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
  const { username } = req.params;
  if (req.user.privilege == "admin") {
    if(username && username != '0')
      repo.deleteUserByUsername(username, (err, data) => {
        err
          ? res.status(500).json({ error: "Internal Server Error, try again" })
          : res.status(200).json({ userInfo: data });
      })
    else if(req.body.email)
      repo.deleteUserByEmail(req.body.email, (err, data) => {
        err
          ? res.status(500).json({ error: "Internal Server Error, try again" })
          : res.status(200).json({ userInfo: data });
      })
    else
      res.status(401).json({ status: "Invalid user" });
  }
  else {
    res.status(401).json({ status: "unauthorized" });
  }

}

  module.exports = { viewUser, updateUser, changePassword, viewUsers, deleteUser };
