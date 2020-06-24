module.exports = function (sequelize, dataTypes) {
    let alias = 'products';
 
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
        },
        createdAt: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updatedAt: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        deleteAt: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }

    let config = {
        timestamps: true
    }

    let product = sequelize.define(alias, cols, config);

    product.associate = function (modelos) {
        product.belongsTo(modelo.category, {
            foreignKey: 'idCategory',
            as: 'category'
        })
    }

    return product;
}