const bcrypt = require('bcryptjs');
const DB = require('../database/models');
let { check, validationResult, body } = require("express-validator");

const loginController = {
    index: (req, res) => {
        res.render("login")
    },
    login: (req,res) => {
        DB.User.findOne({
            where: {
                userName: req.body.username
            }
        }).then((usuarioEncontrado) => {
            if (usuarioEncontrado){
                if(bcrypt.compareSync(req.body.password, usuarioEncontrado.password)) {
                    let user = usuarioEncontrado;
                    delete user.dataValues.password;

                    req.session.user = user;

                    if(req.body.rememberUser) {
                        res.cookie('username', user.username, {maxAge: 1000});
                    }

                    return res.redirect('/')
                } else {
                    return res.render('login', { errors: [{ msg: "Contraseña invalida" }] });
                }
            } else {
                res.render('login', { errors: [{ msg: "El usuario no existe" }] });
            }
        })
    }
}

module.exports = loginController;