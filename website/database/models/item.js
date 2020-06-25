module.exports = function (sequelize, dataTypes) {
    let alias = 'item';
 
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
        deleteAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }

    let config = {
        timestamps: true
    }

    let item = sequelize.define(alias, cols, config);

    item.associate = function (modelos) {
        item.hasMany(modelos.user, {
            foreignKey: 'idUser',
            as: 'users'
        })
        item.belongsTo(modelos.cart, {
            foreignKey: 'idCart',
            as: 'cart'
        })
    }

    return item;
}