const fs = require('fs');

const productsController = {
    index: (req, res) => {
        res.render("product")
    }
}

module.exports = productsController;