const DB = require('../database/models/');
const bcrypt = require('bcryptjs');
let { check, validationResult, body } = require("express-validator");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const profileController = {
    index: (req,res) => {
        return res.render('profile');
    },
    formEdit: (req, res) => {
        let totalProducts = DB.Product.findAll();

        Promise.all([totalProducts])
            .then(function ([products]) {
                res.render('select-product', { products: products });
            })
            .catch(error => console.log(error));
    },
    redirectToProduct: (req, res) => {

    },
    formPermisos: (req, res) => {
        let totalUsers = DB.User.findAll();

        Promise.all([totalUsers])
            .then(function ([users]) {
                res.render('select-user', { users: users });
            })
            .catch(error => console.log(error));
    },
    updatePermisos: (req, res) => {
        
    },
    formProfile: (req, res) => {
        return res.render('update-profile');
    },
    updateProfile: (req, res) => {
        const errors = validationResult(req);
        let updateUser = req.body;

        if (errors.isEmpty()) {
            delete updateUser.retype;
            updateUser.userName = req.session.user.username;
            updateUser.name = req.session.user.name;
            updateUser.lastName = req.session.user.lastname;
            updateUser.birthday = req.session.user.birthday;
            updateUser.email = req.session.user.email;
            updateUser.password = bcrypt.hashSync(updateUser.newPassword, 15);

            DB.User.update(updateUser)
                .then(() => res.redirect('/perfil'));

        } else {
            return res.render('update-profile', { errors: errors.errors });
        }
    },
    history: (req, res) => {
        /* DB.Cart.findAll({
            where: {
                idUser: req.session.user.id
            },
            include: {
                all: true,
                nested: true
            }
        })
            .then(carts => {
                return res.render('shopList', {carts, toThousand });
            }) */
            return res.render('shopList');
    }
}

module.exports = profileController;