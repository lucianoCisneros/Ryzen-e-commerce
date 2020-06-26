
const DB = require('../database/models');
//let usuarioALoguearse = userList.find((user) => {return user.username == req.cookies.rememberUser;});

function rememberUserMiddleware(req, res, next) {
  res.locals.user = false;
  // return res.send(req.session)
  if(req.session.user){
    res.locals.user = req.session.user;
    return next();
  } else if(req.cookies.username){
    DB.User.findOne({
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