const fs = require('fs');
const bcrypt = require('bcryptjs');
const path = require('path');

const loginController = {
    index: (req, res) => {
        res.render("login")
    },
    login: (req, res) => {
        // Traer todos los usuarios del sistema
        let users = fs.readFileSync(path.join(__dirname + '/../data/users.json'), 'utf-8');
        users = JSON.parse(users);
        // Chequear que el usuario exista

        users.forEach(function (user) {
            if (user.username === req.body.username && bcrypt.compareSync(req.body.password, user.password)) {
                // res.send('Estás logueado')
                // let idSolicitado = req.params.id;
                let perfil = users.find(function (user) {
                    if (user.email === req.body.email) {
                        return user.id
                    }
                })
                // res.redirect('/profile/' + perfil.id)
                res.send("¡Te pudiste loguear!");
                // {'perfil':perfil
            }
        })
        res.send('Algo salió mal');
    }
}

module.exports = loginController;