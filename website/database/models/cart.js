module.exports = function (sequelize, dataTypes) {
    let alias = 'cart';
 
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

    let cart = sequelize.define(alias, cols, config);

    cart.associate = function (modelos){
        cart.belongsTo(modelos.user, {
            foreignKey: 'idUser',
            as: 'user'
        });
        cart.belongsTo(modelos.item, {
            foreignKey: 'idCart',
            as: 'cart'
        })
    }

    return cart;
}