const logoutController = {
    
    logout: (req, res) => {
    req.session.destroy();

    if (req.cookies.username) {
        res.clearCookie('username');
    }

    return res.redirect('/');
    }
};

module.exports = logoutController;