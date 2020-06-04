const fs = require('fs');

const shopCartController = {
    index: (req, res) => {
        res.render("shopCart")
    }
}

module.exports = shopCartController;