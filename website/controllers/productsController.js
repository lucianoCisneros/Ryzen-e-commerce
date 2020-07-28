const DB = require('../database/models');
let { check, validationResult, body } = require("express-validator");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsController = {
    index: (req, res) => {
        res.render("product")
    },
    detail: (req,res) => {
        DB.Product.findByPk(req.params.id, {
            include: [{ association: "categories" }]
        })
            .then(producto => {
                let prueba = (producto.description).split('.');
                console.log(prueba)
                return res.render('product-id', { producto: producto, toThousand })
            })
            .catch(error => console.log(error));
    },
    create: (req,res) =>{
        let totalCategories = DB.Category.findAll();

        Promise.all([totalCategories])
            .then(function ([categories]) {
                res.render('add-product', { categories: categories });
            })
            .catch(error => console.log(error));
    },
    store: (req,res) => {
        let newProduct = {
            name: req.body.name,
            title: req.body.title,
            secTitle: req.body.secTitle,
            price: req.body.price,
            description: req.body.description,
            secDescription: req.body.secDescription,
            thirdDescription: req.body.thirdDescription,
            brand: req.body.brand,
            img: req.file.filename,
            secImg: req.body.secImg,
            thirdImg: req.body.thirdImg,
            video: req.body.video,
            idCategory: req.body.category
        }
        console.log(newProduct)
        DB.Product.create(newProduct)
            .then(() => {
                if (newProduct.idCategory == 1 || newProduct.idCategory == 2) {
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
            .then(() => res.redirect('/'))
            .catch(error => console.log(error));
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
            .then((products) => res.render('categories-visors', {products: products, toThousand}))
            .catch(error => console.log(error));
    },
    appsCategory: (req, res) => {
        DB.Product.findAll({
            where: {
                idCategory: [3, 4]
            }
        })
            .then((products) => res.render('apps-games', { products: products, toThousand }))
            .catch(error => console.log(error));
    }
}

module.exports = productsController;