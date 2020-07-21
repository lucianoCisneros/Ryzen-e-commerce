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

    let Cart = sequelize.define(alias, cols);

    Cart.associate = function (modelos){
        Cart.belongsTo(modelos.User, {
            foreignKey: 'idUser',
            as: 'users'
        });
        Cart.hasMany(modelos.Item, {
            foreignKey: 'idCart',
            as: 'items'
        })
    }

    return Cart;
}