const bcrypt = require('bcryptjs');
const db = require('../database/models');
let { check, validationResult, body } = require("express-validator");

const registerController = {
    index: (req, res) => {
        res.render("register")
    },
    register: (req, res) => {
        //faltan validaciones
        let user = req.body;
        //Objeto que se va a guardar en base de datos
        delete user.retype;
        user.userName = req.body.username;
        user.name = req.body.name;
        user.lastName = req.body.lastname;
        user.birthday = req.body.birthday;
        user.email = req.body.email;
        user.password = bcrypt.hashSync(user.password, 15);

        db.User.create(user)
            .then(() => res.redirect('/login'));
    }
}


module.exports = registerController;