const DB = require('../database/models');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const shopCart = {
    cart: (req, res) => {
        DB.Item.findAll({
            where: {
                idUser: req.session.user.id,
                status: 1
            },
            include: ['product']
        })
            .then(items => {

                let total = items.reduce((total, item) => total += parseInt(item.subTotal), 0);
                console.log(items.length)
                return res.render('shopCart', { items, total, toThousand });
            })
    },
    addToCart: (req, res) => {
        DB.Product.findByPk(req.body.productId)
            .then(product => {

                let item = {
                    name: product.name,
                    price: product.price,
                    quantity: req.body.quantity,
                    subTotal: product.price * req.body.quantity,
                    status: 1,
                    idUser: req.session.user.id,
                    idCart: null,
                    idProduct: product.id
                }
                console.log(item)
                DB.Item.create(item)
                    .then(item => {
                        return res.redirect('/carrito');
                    })
            })
    },
    deleteFromCart: (req, res) => {
        DB.Item.destroy({
            where: {
                id: req.body.idUser,
                idUser: req.session.user.id,
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
                status: 1
            }
        })
            .then(itemsLocalizados => {
                items = itemsLocalizados;

                DB.sequelize.query(`UPDATE items SET status = 0 WHERE idUser = ${req.session.user.id} AND status = 1`);
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
                    cartNumber: cart ? cart.cartNumber + 1 : 0,
                    total: items.reduce((total, item) => total += parseInt(item.subTotal), 0),
                    idUser: req.session.user.id
                }

                return DB.Cart.create(newCart);
            })
            .then(cart => {
                return DB.sequelize.query(`UPDATE items SET idCart = ${cart.id} WHERE idUser = ${req.session.user.id} AND idCart IS NULL`);
            })
            .then(() => {
                return res.redirect('/');
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
                return res.render('/historial', {toThousand});
            })
    }
}

module.exports = shopCart;