module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        firstname: {
            type: Sequelize.STRING,
            required: true
        },
        lastname: {
            type: Sequelize.STRING,
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
            type: Sequelize.STRING
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