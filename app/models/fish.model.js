module.exports = (sequelize, Sequelize) => {
    const Fish = sequelize.define("fish", {
        fishname: {
            type: Sequelize.STRING,
        }
    });
    return Fish;
}