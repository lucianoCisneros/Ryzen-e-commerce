
const DB = require('../database/models');

function rememberUserMiddleware(req, res, next){
    next();

    if (req.cookies.username != undefined && req.session.user == undefined){
        let users = DB.User.findAll({});
        let usuarioALoguearse = users.findOne({
            where: {
                userName: req.cookies.username
            }
        });

        req.session.user = usuarioALoguearse;
    }
};

module.exports = rememberUserMiddleware;