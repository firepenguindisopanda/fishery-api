module.exports = (sequelize, Sequelize) => {
    const Fish = sequelize.define("fish", {
        fishname: {
            type: Sequelize.STRING(200),
        }
    });
    return Fish;
}