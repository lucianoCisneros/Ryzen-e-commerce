const DB = require('../database/models/');

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

    }
}

module.exports = profileController;