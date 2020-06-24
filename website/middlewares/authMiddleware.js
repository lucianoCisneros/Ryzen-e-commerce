function authMiddleware(req,res,next) {
    if (req.session.userLogged !== undefined) {
        next();
    }
    else {
        return res.render('login', { errors: [{ msg: "Para acceder al carrito tenés que iniciar sesión" }] })
    }
}

module.exports = authMiddleware;