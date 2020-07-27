const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const profileController = require('../controllers/profileController');

router.get('/', usersController.profile);
router.get('/editar-producto', profileController.formEdit);
router.post('/editar-producto', profileController.redirectToProduct);
router.get('/permisos', profileController.formPermisos);
router.post('/permisos', profileController.updatePermisos);

module.exports = router;