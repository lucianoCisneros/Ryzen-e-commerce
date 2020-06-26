module.exports = function (sequelize, dataTypes) {
    let alias = 'Product';
 
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        description: {
            type: dataTypes.TEXT
        },
        brand: {
            type: dataTypes.STRING,
        },
        img: {
            type: dataTypes.STRING,
            allowNull: false
        },
        idCategory: {
            type: dataTypes.INTEGER,
            unsigned: true,
            allowNull: false
        }
    }

    let Product = sequelize.define(alias, cols);

    Product.associate = function (modelos) {
        Product.belongsTo(modelos.Category, {
            foreignKey: 'idCategory',
            as: 'category'
        })
    }

    return Product;
}