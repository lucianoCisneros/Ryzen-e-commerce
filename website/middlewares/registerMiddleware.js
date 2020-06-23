const { check } = require("express-validator");

let registerMiddleware = [
    check('username')
        .isLength({min:6})
        .withMessage('El usuario debe tener por lo menos 6 caracteres'),
    check('email')
        .isEmail()
        .withMessage('Ingrese un tipo de email valido'),
    check('password')
        .isLength({min:8})
        .withMessage('La contraseña debe tener por lo menos 8 caracteres')
];

module.exports = registerMiddleware;