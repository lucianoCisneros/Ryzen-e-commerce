const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/crear', authMiddleware, categoriesController.category);
router.post('/crear', authMiddleware, categoriesController.createCategory);
router.get('/editar/:id', authMiddleware, categoriesController.edit);
router.post('/editar/:id', authMiddleware, categoriesController.updateCategory);

module.exports = router;