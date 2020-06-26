const path = require('path');
const fs = require('fs');
const db = require('../database/models');
//let usuarioALoguearse = userList.find((user) => {return user.username == req.cookies.rememberUser;});

function rememberUserMiddleware(req, res, next) {
  res.locals.user = false;

  if(req.session.user){
    res.local.user = req.session.user;
    return next();
  } else if(req.cookies.username){
    db.User.findOne({
      where: {
        userName: req.cookies.username
      }
    }).then((user) => {
      if(user){
        delete user.password;
        req.session.user = user;
        res.locals.user = user;
      }
      
      return next();

    })
  } else {
    return next();
  }
}

module.exports = rememberUserMiddleware;