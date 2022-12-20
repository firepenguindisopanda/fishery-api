module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        firstname: {
            type: Sequelize.STRING(100),
            required: true
        },
        lastname: {
            type: Sequelize.STRING(100),
            required: true
        },
        username: {
            type: Sequelize.STRING,
            required: true
        },
        email: {
            type: Sequelize.STRING,
            required: true
        },
        homeaddress: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING(11)
        },
        password: {
            type: Sequelize.STRING,
            required: true
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive')
        }
    });

    return User;
};