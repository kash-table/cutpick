module.exports = (sequelize, DataTypes) => {
    return sequelize.define('designers', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        pictureUrl: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    }, {
        timestamps: true,
    });
};