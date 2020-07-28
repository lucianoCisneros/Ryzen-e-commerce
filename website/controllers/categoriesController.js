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
        DB.Category.findByPk(req.params.id)
            .then(categoria => {
                return res.render('product-id', { categoria: categoria})
            })
            .catch(error => console.log(error));
    },
    updateCategory: (req, res) => {
        DB.Category.update({
            name: req.body.name,
            description: req.body.description,
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(() => res.redirect('/'))
            .catch(error => console.log(error));
    }
}

module.exports = categoriesController;