function authMiddleware(req, res, next) {
    if (req.session.user !== undefined && req.session.user.rol !== 0) {
        next();
    }
    else {
        return res.render('login', { errors: [{ msg: "Para acceder a esta página tenés que iniciar sesión y ser administrador" }] })
    }
}

module.exports = authMiddleware;