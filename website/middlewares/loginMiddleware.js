const { body } = require('express-validator');
const DB = require('../database/models');
const bcrypt = require('bcryptjs');
const { use } = require('../routes/products');

let loginMiddleware = [
  body('username')
    .notEmpty()
    .withMessage('-Ingrese un usuario por favor')
    .isLength({ min: 4 })
    .withMessage('-El usuario debe tener por lo menos 4 caracteres')
    .custom((value, {req}) => {
      return DB.User.findOne({
        where: {
          userName: value
        }
      })
        .then(function (userFound) {
          if (userFound) {
            if (req.body.password.length < 7){
              return Promise.reject('-La contraseña debe tener por lo menos 8 caracteres')
            } else {
              if (!bcrypt.compareSync(req.body.password, userFound.password)) {
                return Promise.reject('-La contraseña ingresada es incorrecta')
                }
              }
          } else {
              return Promise.reject('-El usuario ingresado no existe')
          }
        })
      }),
  body('password')
    .notEmpty()
    .withMessage('-Ingrese una contraseña por favor')
];

module.exports = loginMiddleware;
