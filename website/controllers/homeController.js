const DB = require('../database/models');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const homeController = {
    index: (req,res) => {
        DB.Product.findAll()
            .then((products) => {
                return res.render('index', { products: products })
            })
    },
    aboutUs: (req,res) => {
        res.render("about-us")
    }
}

module.exports = homeController;