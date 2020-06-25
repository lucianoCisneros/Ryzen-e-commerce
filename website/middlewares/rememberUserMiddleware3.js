const path = require('path');
const fs = require('fs');

function rememberUserMiddleware(req, res, next){
    next();

    if (req.cookies.username != undefined && req.session.userLogged == undefined){
        let usersFilePath = path.join(__dirname, "/../data/users.json");
        let users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
        let usuarioALoguearse = users.find((user) => {return user.username == req.cookies.username;});

        req.session.userLogged = usuarioALoguearse;
    }
};

module.exports = rememberUserMiddleware;