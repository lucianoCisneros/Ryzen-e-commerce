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
            .then(() => {
                if (newProduct.idCategory == 1 || 2) {
                    res.redirect('/productos/visores')
                } else{
                    res.redirect('/productos/aplicaciones')
                }
            });
    },
    edit: (req,res) => {
        let totalProducts = DB.Product.findByPk(req.params.id);
        let totalCategories = DB.Category.findAll();
        
        Promise.all([totalProducts, totalCategories])
            .then(function([products, categories]){
                res.render('edit-product', {products: products, categories: categories});
            })
            .catch(error => console.log(error));
    },
    category: (req, res) => {
        return res.render("add-category")
    },
    createCategory: (req,res) => {
        DB.Category.create({
            name: req.body.name,
            description: req.body.description
        })
            .then(() => res.redirect('/productos/categorias'))
            .catch(error => console.log(error));
    },
    update: (req,res) => {
        DB.Product.update({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            brand: req.body.brand,
            img: req.file.filename,
            idCategory: req.body.category
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(() => res.redirect('/categorias'))
            .catch(error => console.log(error));;
    },
    delete: (req,res) => {
        DB.Product.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(() => res.redirect("/categorias"))
            .catch(error => console.log(error));
    },
    visorsCategory: (req,res) => {
        DB.Product.findAll({
            where: {
                idCategory: 1
            }
        })
            .then((products) => res.render('categories-visors', {products: products}))
            .catch(error => console.log(error));
    },
    appsCategory: (req, res) => {
        DB.Product.findAll({
            where: {
                idCategory: [3, 4]
            }
        })
            .then((products) => res.render('apps-games', { products: products }))
            .catch(error => console.log(error));
    }
}

module.exports = productsController;