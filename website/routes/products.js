const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const multer = require('multer');
const path = require('path');

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
router.get('/:id', productsController.detail);
router.get('/crear', productsController.create);
router.post('/crear', upload.single('img'), productsController.store);
router.get('/categorias', productsController.category)
router.post('/categorias', productsController.createCategory);
router.get('/editar/:id', productsController.edit);
router.post('/editar/:id', productsController.update);
router.post('/eliminar', productsController.delete);

module.exports = router;