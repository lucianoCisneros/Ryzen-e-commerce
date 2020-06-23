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
                    res.send('¡Te pudiste loguear! Al fin');
                }
                else {
                    res.render('login', { errors: [{ msg: "Contraseña invalida" }] })
                }
            }
            else {
                    res.render('login', { errors: [{ msg: "Usuario no existe" }] })
            }
        }
        else {
            return res.render('login', {errors: errors.errors})
        }
    }
}

module.exports = loginController;