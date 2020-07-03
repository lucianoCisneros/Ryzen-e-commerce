const bcrypt = require('bcryptjs');
const DB = require('../database/models');
let { validationResult } = require("express-validator");

const registerController = {
    index: (req, res) => {
        res.render("register")
    },
    register: (req, res) => {
        const errors = validationResult(req);
        let newUser = req.body;

        //Objeto que se va a guardar en base de datos

        if(errors.isEmpty()){
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
    }
}


module.exports = registerController;