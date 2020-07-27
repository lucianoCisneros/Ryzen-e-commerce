const DB = require('../database/models');

const categoriesController = {
    index: (req,res) => {
        return res.render('categories');
    },
    category: (req, res) => {
        return res.render("add-category");
    },
    createCategory: (req, res) => {
        DB.Category.create({
            name: req.body.name,
            description: req.body.description
        })
            .then(() => res.redirect('/productos/visores'))
            .catch(error => console.log(error));
    }
}

module.exports = categoriesController;