const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productsController = require('../controllers/productsController');
const authMiddleware = require('../middlewares/authMiddleware')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../website/public/img/products')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

var upload = multer({
    storage: storage,
    // Validate image
    fileFilter: (req, file, cb) => {
        console.log(file)
        const acceptedExtensions = ['.jpg', '.jpeg', '.png'];
        const ext = path.extname(file.originalname);
        if (!acceptedExtensions.includes(ext)) {
            req.file = file;
        }
        cb(null, acceptedExtensions.includes(ext));
    }
});

router.get('/', productsController.index);
router.get('/crear', authMiddleware, productsController.create);
router.post('/crear', authMiddleware, upload.single('img'), productsController.store);
router.get('/categorias', authMiddleware, productsController.category)
router.post('/categorias', authMiddleware, productsController.createCategory);
router.get('/editar/:id', authMiddleware, productsController.edit);
router.post('/editar/:id', authMiddleware, productsController.update);
router.post('/eliminar', authMiddleware, productsController.delete);
router.get('/:id', productsController.detail);

module.exports = router;