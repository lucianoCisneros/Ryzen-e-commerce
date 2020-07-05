
module.exports = function (sequelize, dataTypes) {
    let alias = 'Category';
 
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unsigned: true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        description: {
            type: dataTypes.TEXT
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

    let config = {
        tableName: 'categories'
    }

    let Category = sequelize.define(alias, cols, config);

    Category.associate = function(modelos){
        Category.hasMany(modelos.Product, {
            foreignKey: 'idCategory',
            as: 'products'
        })
    }

    return Category;
}