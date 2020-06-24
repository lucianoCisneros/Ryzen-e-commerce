const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const loginMiddlewares = require('../middlewares/loginMiddleware');

router.get('/', loginController.index);
router.post('/', loginMiddlewares, loginController.login);
router.get('/check', function(req,res){
    if (req.session.userLogged == undefined) {
        res.send('no estas logueado')
    }
    else {
        res.send('Tu usuario es ' + req.session.userLogged.username)
    }
})

module.exports = router;