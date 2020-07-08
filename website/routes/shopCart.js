const express = require('express');
const router = express.Router();
const shopCartController = require('../controllers/shopCartController');
const cartMiddleware = require('../middlewares/cartMiddleware')

router.get('/', cartMiddleware, shopCartController.index);

module.exports = router;