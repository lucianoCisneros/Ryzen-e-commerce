const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const profileController = require('../controllers/profileController');
const updateUserMiddleware = require('../middlewares/updateUserMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/', authMiddleware, usersController.profile);
router.get('/editar-producto', authMiddleware, profileController.formEdit);
router.post('/editar-producto', authMiddleware, profileController.redirectToProduct);
router.get('/permisos', authMiddleware, adminMiddleware, profileController.formPermisos);
router.post('/permisos', authMiddleware, adminMiddleware, profileController.updatePermisos);
router.get('/actualizar-perfil', authMiddleware, adminMiddleware, profileController.formProfile);
router.post('/actualizar-perfil', authMiddleware, adminMiddleware, updateUserMiddleware, profileController.updateProfile);
router.get('/historial', authMiddleware, profileController.history);

module.exports = router;