const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/crear', authMiddleware, categoriesController.category);
router.post('/crear', authMiddleware, categoriesController.createCategory);

module.exports = router;