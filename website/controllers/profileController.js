const DB = require('../database/models/');
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
        return res.render('update-profile');
    },
    formProfile: (req, res) => {
        return res.render('update-profile');
    },
    updateProfile: (req, res) => {
        DB.User.update({
            rol: req.body.rol
        }, {
            where: {
                id: req.body.user
            }
        })
            .then(() => res.redirect('/perfil'))
            .catch(error => console.log(error));;
    },
    history: (req, res) => {
        DB.Cart.findAll({
            where: {
                idUser: req.session.user.id
            },
            include: {
                all: true,
                nested: true,
            }
        })
            .then(carts => {
                return res.render('shopList', {carts, toThousand });
                /* res.send(carts[0].items.name) */
            })
    }
}

module.exports = profileController;