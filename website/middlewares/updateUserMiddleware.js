const { body } = require("express-validator");
const DB = require('../database/models');
const bcrypt = require('bcryptjs');

let updateUserMiddleware = [
    body('oldPassword')
        .custom(({ req }) => {
            DB.User.findOne({
                where: {
                    userName: req.session.user.userName
                }
            })
            .then(userFound => {
                if (!bcrypt.compareSync(req.body.oldPassword, userFound.password)){
                    return Promise.reject('-La contraseña ingresada es incorrecta')
                }
            })
        }),
    body('newPassword')
        .isLength({ min: 8 })
        .withMessage('-La contraseña debe tener por lo menos 8 caracteres')
        .custom((value, { req }) => value == req.body.retype)
        .withMessage('-Las contraseñas no coinciden'),
    body('retype')
        .notEmpty()
        .withMessage('-Este campo es obligatorio')
];

module.exports = updateUserMiddleware;