const path = require('path');
const fs = require('fs');
//let usuarioALoguearse = userList.find((user) => {return user.username == req.cookies.rememberUser;});

function rememberUserMiddleware(req, res, next) {
  res.locals.user = false;

  if (req.session.userLogged) {
    res.locals.user = req.session.userLogged;
    return next();
  }
  else if (req.cookies.username) {
    let usersFilePath = path.join(__dirname, "/../data/users.json");
    let userList = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
    const user = userList.find((e) => e.username == req.cookies.username);
    
    // return res.send(user)
    if (user) {
      delete user.password;
      req.session.userLogged = user;
      res.locals.user = user;
    }
    return next();
  } else {
    return next();
  }
  
}

module.exports = rememberUserMiddleware;