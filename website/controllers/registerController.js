const bcrypt = require('bcryptjs');
const db = require('../database/models');
let { check, validationResult, body } = require("express-validator");

const registerController = {
    index: (req, res) => {
        res.render("register")
    },
    register: (req, res) => {
        let errors = validationResult(req);
        let newUser = req.body;

        //Objeto que se va a guardar en base de datos

        if(errors.isEmpty){
            delete newUser.retype;
            newUser.userName = req.body.username;
            newUser.name = req.body.name;
            newUser.lastName = req.body.lastname;
            newUser.birthday = req.body.birthday;
            newUser.email = req.body.email;
            newUser.password = bcrypt.hashSync(newUser.password, 15);

            let usuarioEncontrado = () => {
                let user = req.body;
                return db.User.userName === user.username;
            }
            let emailEncontrado = () => {
                let user = req.body;
                return db.User.email === user.email;
            }

            if(usuarioEncontrado){
                return res.render('register', { errors: [{ msg: "El nombre de usuario ingresado ya está en uso" }] })
            } else if (emailEncontrado){
                return res.render('register', { errors: [{ msg: "El email ingresado ya está en uso" }] })
            } else {
                db.User.create(newUser)
                    .then(() => res.redirect('/login'));
            }
        } else {
            res.render('register', { errors: errors.errors });
        }
    }
}


module.exports = registerController;