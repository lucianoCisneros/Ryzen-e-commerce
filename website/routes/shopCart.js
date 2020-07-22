const express = require('express');
const router = express.Router();
const shopCartController = require('../controllers/shopCartController');
const cartMiddleware = require('../middlewares/cartMiddleware');


router.post('/agregar', cartMiddleware, shopCartController.addToCart);
router.post('/eliminarItem', cartMiddleware, shopCartController.deleteFromCart);
router.post('/comprar', cartMiddleware, shopCartController.purchase)
router.get('/', cartMiddleware, shopCartController.cart);


module.exports = router;