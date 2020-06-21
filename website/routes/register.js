const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
let {check, validationResult, body} = require('express-validator')
const registerMiddleware = require('../middlewares/registerMiddleware');

router.get('/', registerController.index);
router.post('/', registerMiddleware, registerController.register);

module.exports = router;