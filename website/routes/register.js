const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const registerMiddleware = require('../middlewares/registerMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

router.get('/', guestMiddleware, usersController.indexRegister);
router.post('/', registerMiddleware, usersController.register);

module.exports = router;