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
    },
    edit: (req, res) => {
        let totalCategories = DB.Category.findAll();

        Promise.all([totalCategories])
            .then(function ([categories]) {
                res.render('edit-category', { categories: categories });
            })
            .catch(error => console.log(error));
    },
    updateCategory: (req, res) => {
        DB.Category.update({
            name: req.body.name,
            description: req.body.description,
        }, {
            where: {
                id: req.body.category
            }
        })
            .then(() => res.redirect('/'))
            .catch(error => console.log(error));
    }
}

module.exports = categoriesController;