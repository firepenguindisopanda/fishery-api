const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.fish = require("../models/fish.model.js")(sequelize, Sequelize);
db.fishcaught = require("../models/fishcaught.model.js")(sequelize, Sequelize);
db.sold = require("../models/sold.model.js")(sequelize, Sequelize);

// start of user and roles relationship
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
// end of user and roles relationship

// start of fish and fishcaught relationship
db.fish.belongsToMany(db.user, {
    through: db.fishcaught,
    foreignKey: "fishid",
    otherKey: "userid"
});
// end of fish and fishcaught relationship

// start of user and fishcaught relationship
db.user.belongsToMany(db.fish, {
    through: db.fishcaught,
    foreignKey: "userid",
    otherKey: "fishid"
});
// end of user and fishcaught relationship

// a fish can be sold by many users
// start of fish and sold relationship
db.fish.belongsToMany(db.user, {
    through: db.sold,
    foreignKey: "fishid",
    otherKey: "userid"
});
// end of fish and sold relationship

// start of user and sold relationship
db.user.belongsToMany(db.fish, {
    through: db.sold,
    foreignKey: "userid",
    otherKey: "fishid"
});
// end of user and sold relationship

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;