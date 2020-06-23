const { check } = require("express-validator");

let loginMiddleware = [
  check("username")
    .isLength({ min: 6 })
    .withMessage("El usuario debe tener por lo menos 6 caracteres"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener por lo menos 8 caracteres"),
];

module.exports = loginMiddleware;
