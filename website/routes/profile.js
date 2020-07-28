const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const profileController = require('../controllers/profileController');
const updateUserMiddleware = require('../middlewares/updateUserMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, usersController.profile);
router.get('/editar-producto', authMiddleware, profileController.formEdit);
router.post('/editar-producto', authMiddleware, profileController.redirectToProduct);
router.get('/permisos', authMiddleware, profileController.formPermisos);
router.post('/permisos', authMiddleware, profileController.updatePermisos);
router.get('/actualizar-perfil', authMiddleware, profileController.formProfile);
router.post('/actualizar-perfil', authMiddleware, updateUserMiddleware, profileController.updateProfile);
router.get('/historial', authMiddleware, profileController.history);

module.exports = router;