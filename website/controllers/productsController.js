const DB = require('../database/models');
let { check, validationResult, body } = require("express-validator");

const productsController = {
    index: (req, res) => {
        res.render("product")
    },
    detail: (req,res) => {
        DB.Product.findByPk(req.params.id, {
            include: [{ association: "category" }]
        })
            .then(producto => {
                console.log(req.params.id)
                res.render('product-id', { producto: producto })
            })
            .catch(error => console.log(error));
    },
    create: (req,res) =>{
        res.render("add-product")
    },
    store: (req,res) => {
        let newProduct = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            brand: req.body.brand,
            img: req.file.filename,
            idCategory: req.body.category
        }
        DB.Product.create(newProduct)
            .then(() => res.redirect('/producto/editar'));
    },
    edit: (req,res) => {
        DB.Product.findByPk(req.params.id, {
            include: [{association: "category"}]
        })
            .then( producto => {
                console.log(req.params.id)
                res.render('edit-product', { producto: producto})
            })
            .catch(error => console.log(error));
    },
    category: (req, res) => {
        return res.render("add-category")
    },
    createCategory: (req,res) => {
    /* let newCategory = req.body;*/
        console.log(req.body.name);
        console.log(req.body.description);

        /*newCategory.name = req.body.name;
        newCategory.description = req.body.description;

        DB.Category.create(newCategory)
            .then(() => res.redirect('/categoria'))
            .catch(error => console.log(error)); */

        DB.Category.create({
            name: req.body.name,
            description: req.body.description
        })
            .then(() => res.redirect('/producto/categorias'))
            .catch(error => console.log(error));
    },
    update: (req,res) => {

    },
    delete: (req,res) => {

    }
}

module.exports = productsController;