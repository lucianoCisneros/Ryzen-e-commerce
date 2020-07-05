const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const loginMiddleware = require('../middlewares/loginMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware')

router.get('/', guestMiddleware, loginController.index);
router.post('/', loginMiddleware, loginController.login);

module.exports = router;