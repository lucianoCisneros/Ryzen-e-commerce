module.exports = function (sequelize, dataTypes) {
    let alias = 'Detail';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unsigned: true
        },
        title: {
            type: dataTypes.STRING
        },
        secondaryTitle: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.TEXT
        },
        secDescription: {
            type: dataTypes.TEXT
        },
        img: {
            type: dataTypes.STRING
        },
        secImg: {
            type: dataTypes.STRING
        },
        video: {
            type: dataTypes.INTEGER
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


    let Detail = sequelize.define(alias, cols);

    //Relacion??

    return Detail;
}