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
        }
    }

    let Item = sequelize.define(alias, cols);

    Item.associate = function (modelos) {
        Item.hasMany(modelos.User, {
            foreignKey: 'idUser',
            as: 'users'
        })
        Item.belongsTo(modelos.Cart, {
            foreignKey: 'idCart',
            as: 'cart'
        })
    }

    return Item;
}