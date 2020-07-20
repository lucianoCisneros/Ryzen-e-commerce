module.exports = function(sequelize, dataTypes){
    let alias = 'User';
 
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unsigned: true
        },
        userName: {
            type: dataTypes.STRING,
            unique: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: dataTypes.STRING,
            allowNull: false
        },
        avatar: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        rol: {
            type: dataTypes.NUMBER,
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

    let User = sequelize.define(alias, cols);

    User.associate = function (modelos) {
        User.hasMany(modelos.Item, {
            foreignKey: 'idUser',
            as: 'items'
        });
        User.hasMany(modelos.Cart, {
            foreignKey: 'idUser',
            as: 'carts'
        });
    }

    return User;
}