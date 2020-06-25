module.exports = function(sequelize, dataTypes){
    let alias = 'user';
 
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
        deleteAt: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
        }
    }

    let config = {
        timestamps: true
    }
    
    let user = sequelize.define(alias, cols, config);

    user.associate = function (modelos) {
        user.belongsTo(modelos.item, {
            foreignKey: 'idUser',
            as: 'user'
        });
        user.belongsTo(modelos.cart, {
            foreignKey: 'idUser',
            as: 'user'
        });
    }

    return user;
}