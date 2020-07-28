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
        title: {
            type: dataTypes.STRING
        },
        secTitle: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        description: {
            type: dataTypes.TEXT
        },
        secDescription: {
            type: dataTypes.TEXT
        },
        thirdDescription: {
            type: dataTypes.TEXT
        },
        brand: {
            type: dataTypes.STRING,
        },
        img: {
            type: dataTypes.STRING,
            allowNull: false
        },
        secImg: {
            type: dataTypes.STRING
        },
        thirdImg: {
            type: dataTypes.STRING
        },
        video: {
            type: dataTypes.STRING
        },
        idCategory: {
            type: dataTypes.INTEGER,
            unsigned: true,
            allowNull: false
        },
        createdAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updatedAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        deletedAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }

    let Product = sequelize.define(alias, cols);

    Product.associate = function (modelos) {
        Product.belongsTo(modelos.Category, {
            foreignKey: 'idCategory',
            as: 'categories'
        })
        Product.associate = function (modelos) {
            Product.hasMany(modelos.Item, {
                foreignKey: "idProduct",
                as: 'item'
            })
        }
    }

    return Product;
}