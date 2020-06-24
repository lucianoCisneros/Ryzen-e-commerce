function guestMiddleware(req,res) {
    if (req.session.userLogged == undefined) {
        next();
    }
    else {

    }
}

module.exports = guestMiddleware;