module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            login: DataTypes.STRING,
            password: DataTypes.STRING,
            token: DataTypes.STRING,
        },
        {},
    );

    User.associate = function() {
        // associations can be defined here
    };

    return User;
};
