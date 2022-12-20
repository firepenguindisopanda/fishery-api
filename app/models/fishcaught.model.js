module.exports = (sequelize, Sequelize) => {
    const FishCaught = sequelize.define("fishcaught", {
        fishcaughtid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        weight: {
            type: Sequelize.INTEGER,
            required: true
        },
        datecaught: {
            type: Sequelize.DATE,
            required: true
        }

    });
    return FishCaught;
}