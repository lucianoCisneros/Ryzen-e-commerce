const { body } = require('express-validator');
const DB = require('../database/models');
const bcrypt = require('bcryptjs')

let loginMiddleware = [
  body('username')
    .notEmpty()
    .withMessage('Ingrese un usuario por favor')
    .isLength({ min: 4 })
    .withMessage('El usuario debe contener minimo 4 caracteres')
    .custom((value, {req}) => {
      return DB.User.findOne({
        where: {
          userName: value
        }
      })
        .then(function (resultado) {
          if (resultado) {
            if (!bcrypt.compareSync(req.body.password, resultado.password)) {
              return Promise.reject('La contraseña o el email son incorrectos')
            }
          } else {
              return Promise.reject('La contraseña o el email son incorrectos')
          }
        })
      }),
  body('password')
    .notEmpty()
    .withMessage('Ingrese una contraseña por favor')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener por lo menos 8 caracteres')
];

module.exports = loginMiddleware;
