module.exports = function (sequelize, dataTypes) {
    let alias = 'Item';
 
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unsigned: true
        },
        idUser: {
            type: dataTypes.INTEGER,
            unsigned: true,
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL
        },
        quantity: {
            type: dataTypes.INTEGER
        },
        totalPrice: {
            type: dataTypes.DECIMAL
        },
        status: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        idCart: {
            type: dataTypes.INTEGER,
            unsigned: true,
            allowNull: true
        },
        idProduct: {
                type: dataTypes.INTEGER
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

    let Item = sequelize.define(alias, cols);

    Item.associate = function (modelos) {
        Item.belongsTo(modelos.User, {
            foreignKey: 'idUser',
            as: 'users'
        })
        Item.belongsTo(modelos.Cart, {
            foreignKey: 'idCart',
            as: 'carts'
        })
        Item.belongsTo(modelos.Product, {
            as: 'product',
            foreignKey: 'idProduct'
        })
    }

    return Item;
}