const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const loginMiddleware = require('../middlewares/loginMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

router.get('/', guestMiddleware, usersController.indexLogin);
router.post('/', loginMiddleware, usersController.login);

module.exports = router;