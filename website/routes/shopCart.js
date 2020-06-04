const express = require('express');
const router = express.Router();
const shopCartController = require('../controllers/shopCartController');

router.get('/', shopCartController.index);

module.exports = router;