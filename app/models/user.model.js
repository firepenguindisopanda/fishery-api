module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        firstname: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        lastname: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        homeaddress: {
            type: Sequelize.STRING,
            defaultValue: 'N/A'
        },
        phone: {
            type: Sequelize.STRING(11),
            defaultValue: 'N/A'
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
    });

    return User;
};