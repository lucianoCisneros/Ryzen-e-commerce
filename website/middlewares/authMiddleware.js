function authMiddleware(req, res, next) {
    if (req.session.user !== undefined) {
        next();
    }
    else {
        return res.render('login', { errors: [{ msg: "Para acceder a esta página tenés que iniciar sesión" }] })
    }
}

module.exports = authMiddleware;