const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const loginMiddlewares = require('../middlewares/loginMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware')

router.get('/', guestMiddleware, loginController.index);
router.post('/', loginMiddlewares, loginController.login);

module.exports = router;