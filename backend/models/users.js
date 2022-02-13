module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
        userId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        pw: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    }, {
        timestamps: true,
    });
};