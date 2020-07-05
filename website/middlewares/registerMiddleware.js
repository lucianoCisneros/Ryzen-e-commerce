const { body } = require("express-validator");
const DB = require('../database/models');

let registerMiddleware = [
    body('username')
        .isLength({min: 4})
        .withMessage('El usuario debe contener minimo 4 caracteres')
        .notEmpty()
        .withMessage('Este campo es obligatorio')
        .custom(value => {
            return DB.User.findOne({
                where: {
                    userName: value
                }
            })
                .then(function (resultado) {
                    if (resultado) {
                        return Promise.reject('El usuario ingresado se encuentra en uso')
                    }
                })
        }),
    body('name')
        .notEmpty()
        .withMessage('Este campo es obligatorio'),
    body('lastname')
        .notEmpty()
        .withMessage('Este campo es obligatorio'),
    body('email')
        .notEmpty()
        .withMessage('Este campo es obligatorio')
        .isEmail()
        .withMessage('Debes ingresar un email valido')
        .custom(value => {
            return DB.User.findOne({
                where: {
                    email: value
                }
            })
                .then(function (resultado) {
                    if (resultado) {
                        return Promise.reject('El email ingresado se encuentra en uso')
                    }
                })
        }),

    body('password')
        .notEmpty()
        .withMessage('Este campo es obligatorio')
        .isLength({min: 8})
        .withMessage('La contraseña debe tener por lo menos 8 caracteres')
        .custom((value, {req}) => req.body.password == req.body.retype)
        .withMessage('Las contraseñas no coinciden'),
    body('retype')
        .notEmpty()
        .withMessage('Este campo es obligatorio')
];

module.exports = registerMiddleware;