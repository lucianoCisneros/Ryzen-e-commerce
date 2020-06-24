const express = require('express');
const router = express.Router();
const shopCartController = require('../controllers/shopCartController');
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', authMiddleware, shopCartController.index);

module.exports = router;