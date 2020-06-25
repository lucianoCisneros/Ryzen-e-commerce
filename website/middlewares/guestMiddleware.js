function guestMiddleware(req,res,next) {
    if (req.session.userLogged == undefined) {
        next();
    }
    else {
        return res.redirect('/');
    }
}

module.exports = guestMiddleware;