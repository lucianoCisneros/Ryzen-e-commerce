const fs = require('fs');
const bcrypt = require('bcryptjs');
const path = require('path');

const registerController = {
    index: (req, res) => {
        res.render("register")
    },
    //index2: (req, res) => {
    //    let users = fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8');
        //users = JSON.parse(users);
    //    res.send("lo lograste")
    //},
    register: (req,res) => {
        // res.send('Llegaron los datos ' + req.body)
        let users = fs.readFileSync(path.join(__dirname, '/../data/users.json'), 'utf-8');
        users = JSON.parse(users);
        let nextId;

        // Crear id para usuario
        if (users == false) {
            nextId = 1;
        } else {
            nextId = users[users.length - 1].id + 1;
        }
        // Crear un usuario

        let user = {
            id: nextId,
            username: req.body.username,
            edad: req.body.edad,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
        }
        console.log(req.body)
        // Agregar el dato del archivo para recuperarlo despues
        let usuarioEncontrado = users.find((usuario) => {
            return usuario.email === user.email
        });
        if (usuarioEncontrado) {
            res.send('El usuario ya existe')
        } else {
            // Agregar al usuario en la base de datos
            users = [...users, user]; // Tengo array de usuario en formato de objetos
            users = JSON.stringify(users, null, ' '); // Lo transformo en cadena de texto (unica manera de guardar usuarios)

            //Guardarlo
            fs.writeFileSync(path.join(__dirname, '/../data/users.json'), users);

            //Redirigir
            res.redirect('/login');
        }
    }
}

module.exports = registerController;