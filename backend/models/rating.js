module.exports = (sequelize, DataTypes) => {
    return sequelize.define('rating', {
        userId: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        designerId: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        designType: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: true,
    });
};