const fs = require('fs');
const bcrypt = require('bcryptjs');
const path = require('path');
let { check, validationResult, body } = require("express-validator");

const loginController = {
    index: (req, res) => {
        res.render("login")
    },
    login: (req,res) => {
        let usersFilePath = path.join(__dirname, '/../data/users.json');
        let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        let userNick = req.body.username;
        let usuarioEncontrado = users.find((user) => {return userNick === user.username});
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            if (usuarioEncontrado) {
                let passwordValidation = bcrypt.compareSync(req.body.password, usuarioEncontrado.password);
                if (passwordValidation){
                    req.session.userLogged = usuarioEncontrado;
                    if (req.body.rememberUser != undefined){
                        res.cookie('username', req.session.userLogged.username, {maxAge: 1000000});
                    }
                    return res.redirect('/');
                }
                else {
                    return res.render('login', { errors: [{ msg: "Contraseña invalida" }] })
                }
            }
            else {
                    return res.render('login', { errors: [{ msg: "Usuario no existe" }] })
            }
        }
        else {
            return res.render('login', {errors: errors.errors})
        }
    }
}

module.exports = loginController;