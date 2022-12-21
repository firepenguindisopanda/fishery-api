module.exports = (sequelize, Sequelize) => {
    const Sold = sequelize.define("sold", {
        weight: {
            type: Sequelize.INTEGER,
            required: true
        },
        price: {
            type: Sequelize.INTEGER,
            required: true
        },
        datesold: {
            type: Sequelize.DATE,
        }
    });
    return Sold;
}