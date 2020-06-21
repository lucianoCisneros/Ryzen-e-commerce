const fs = require('fs');
const bcrypt = require('bcryptjs');
const path = require('path');
let { check, validationResult, body } = require("express-validator");

const loginController = {
  index: (req, res) => {
    res.render("login")
  },
  login: (req, res) => {
    // Traer todos los usuarios del sistema
    let users = fs.readFileSync(path.join(__dirname + "/../data/users.json"),"utf-8");
    users = JSON.parse(users);
    
    // Chequear que el usuario exista
    let errors = validationResult(req);
    let usuarioALoguearse;
    if (errors.isEmpty()) {
      users.forEach(function () {
        console.log(errors);
        if (users.username === req.body.username && bcrypt.compareSync(req.body.password, users.password)){
          let usuarioALoguearse = user.id;
          res.send("¡Te pudiste loguear!");
        }
      })
    }
    if (usuarioALoguearse == undefined) {
      //console.log(usuarioALoguearse);
      res.render("login", { errors: [{ msg: "Usuario o contraseña invalido" }] });
    }
    else {
        return res.render('login', {errors: errors.errors})
    }
  }
}
    module.exports = loginController;