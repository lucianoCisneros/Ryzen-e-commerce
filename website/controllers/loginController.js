const DB = require('../database/models');
let { validationResult } = require("express-validator");

const loginController = {
    index: (req, res) => {
        res.render('login');
    },
    login: (req,res) => {
        const errors = validationResult(req);

        if(errors.isEmpty()){
            DB.User.findOne({
                where: {
                    userName: req.body.username
                }
            })
            .then((usuarioEncontrado) => {
                delete usuarioEncontrado.password;
                req.session.user = usuarioEncontrado;
                if (req.body.rememberUser != undefined) {
                    res.cookie('username', usuarioEncontrado.userName, { maxAge: 1000 * 60 * 60 });
                }
                return res.redirect('/');
            })
        } else {
            res.render('login', { errors: errors.errors });
        }
    }
}


module.exports = loginController;