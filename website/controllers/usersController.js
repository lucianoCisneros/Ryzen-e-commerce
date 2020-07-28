const bcrypt = require('bcryptjs');
const DB = require('../database/models');
let { validationResult } = require("express-validator");

const usersController = {
    indexRegister: (req, res) => {
        res.render("register")
    },
    register: (req, res) => {
        const errors = validationResult(req);
        let newUser = req.body;

        if (errors.isEmpty()) {
            delete newUser.retype;
            newUser.userName = req.body.username;
            newUser.name = req.body.name;
            newUser.lastName = req.body.lastname;
            newUser.birthday = req.body.birthday;
            newUser.email = req.body.email;
            newUser.password = bcrypt.hashSync(newUser.password, 15);

            DB.User.create(newUser)
                .then(() => res.redirect('/login'));

        } else {
            res.render('register', { errors: errors.errors });
        }
    },
    indexLogin: (req, res) => {
        res.render('login');
    },
    login: (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            DB.User.findOne({
                where: {
                    userName: req.body.username
                }
            })
                .then((usuarioEncontrado) => {
                    delete usuarioEncontrado.password;
                    req.session.user = usuarioEncontrado;
                    if (req.body.rememberUser != undefined) {
                        if (DB.User.rol == 10) {
                            res.locals.admin = 1;
                        }
                        res.cookie('username', usuarioEncontrado.userName, { maxAge: 10000 * 300 * 300 });
                    }

                    return res.redirect('/');
                })
        } else {
            res.render('login', { errors: errors.errors });
        }
    },
    logout: (req, res) => {
        req.session.destroy();

        if (req.cookies.username) {
            res.clearCookie('username');
        }

        return res.redirect('/');
    },
    profile: (req, res) => {
        return res.render('profile');
    }
}

module.exports = usersController;