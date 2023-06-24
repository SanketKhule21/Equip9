const Sequelize = require("sequelize");
const db = {};

const sequelize = new Sequelize("assesment", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

db.sequelize = sequelize;

module.exports = db;
