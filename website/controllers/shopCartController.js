const DB = require('../database/models');

const shopCart = {
    index: (req, res) => {
        res.render("shopCart");
    },
    addToCart: (req, res) => {
        DB.Product.findByPk(req.body.productId)
            .then(product => {

                let item = {
                    price: DB.Product.price,
                    quantity: req.body.quantity,
                    totalPrice: DB.Product.price * req.body.quantity,
                    status: 1,
                    idUser: req.session.user.id,
                    idCart: null,
                    idProduct: DB.Product.id
                }

                DB.Item.create(item)
                    .then(item => {
                        return res.redirect('/carrito');
                    })
            })
    },
    cart: (req, res) => {
        DB.Item.findAll({
            where: {
                idUser: req.session.id,
                status: 1
            },
            include: ['product']
        })
            .then(items => {

                let total = DB.Item.reduce((total, item) => total = total + DB.Item.totalPrice, 0);

                return res.render('/carrito', { items, total });
            })
    },
    deleteFromCart: (req, res) => {
        DB.Item.destroy({
            where: {
                //idItem tiene que estar en la vista
                id: req.body.idItem
            },
            force: true
        })
            .then(() => {
                return res.redirect('/carrito');
            })
    },
    purchase: (req, res) => {
        let items;

        DB.Item.findAll({
            where: {
                idUser: req.session.user.id,
                state: 1
            }
        })
            .then(itemsLocalizados => {
                items = itemsLocalizados;

                DB.sequelize.query(`UPDATE items SET state = 0 WHERE userId = ${req.session.user.id} AND state = 1`);
            })
            .then(() => {
                return DB.Cart.findOne({
                    order: [
                        ['createdAt', 'DESC']
                    ]
                })
            })
            .then(cart => {
                let newCart = {
                    cartNumber: cart ? DB.Cart.cartNumber + 1 : 0,
                    total: DB.Item.reduce((total, item) => total += DB.Item.totalPrice, 0),
                    idUser: req.session.user.id
                }

                return DB.Cart.create(newCart);
            })
            .then(cart => {
                return DB.sequelize.query(`UPDATE items SET idCart = ${DB.Cart.id} WHERE idUser = ${req.session.user.id} AND idCart IS NULL`);
            })
            .then(() => {
                return res.redirect('/historial');
            })
    },
    history: (req, res) => {
        DB.Cart.findAll({
            where: {
                idUser: req.session.user.id
            },
            include: {
                all: true,
                nested: true
            }
        })
            .then(carts => {
                return res.render('/historial');
            })
    }
}

module.exports = shopCart;