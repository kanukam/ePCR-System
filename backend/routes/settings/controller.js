const repo = require('./repository');

function viewUser(req, response) {
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

module.exports = { viewUser };
