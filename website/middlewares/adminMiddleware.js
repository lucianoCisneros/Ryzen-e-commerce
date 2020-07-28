function adminMiddleware(req, res, next) {
    if (req.session.user.rol == 10) {
        next();
    }
    else {
        return res.redirect('/')
    } 
}

module.exports = adminMiddleware;