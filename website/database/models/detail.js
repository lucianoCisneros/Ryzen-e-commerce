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
            type: dataTypes.TEXT
        },
        secondaryTitle: {
            type: dataTypes.TEXT
        },
        description: {
            type: dataTypes.TEXT
        },
        secDescription: {
            type: dataTypes.TEXT
        },
        video: {
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

    

    return Detail;
}