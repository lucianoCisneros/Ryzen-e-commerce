const path = require('path');
const { check , body} = require("express-validator");

let registerMiddleware = [
    check('username')
        .isLength({min:6})
        .withMessage('El usuario debe tener por lo menos 6 caracteres'),
    check('email')
        .isEmail()
        .withMessage('Ingrese un tipo de email valido'),
    check('password')
        .isLength({min:8})
        .withMessage('La contraseña debe tener por lo menos 8 caracteres'),
    /* body('username').custom(function(value){
        let usersFilePath = path.join(__dirname, '/../data/users.json');
        let users;

        if(usersFilePath = "") {
            users = []
        }
        else {
            users = JSON.parse(users)
        }

        for (let i = 0; i < users.length; i++) {
            if (users[i].username == value) {
                return false
            }
        }

        return true;
    }).withMessage('El nombre de usuario ya está en uso') */
];

module.exports = registerMiddleware;