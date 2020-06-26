module.exports = function (sequelize, dataTypes) {
    let alias = 'Cart';
 
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
        cartNumber: {
            type: dataTypes.INTEGER
        },
        total: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        }
    }

    let Cart = sequelize.define(alias, cols);

    Cart.associate = function (modelos){
        Cart.belongsTo(modelos.User, {
            foreignKey: 'idUser',
            as: 'user'
        });
        Cart.belongsTo(modelos.Item, {
            foreignKey: 'idCart',
            as: 'item'
        })
    }

    return Cart;
}