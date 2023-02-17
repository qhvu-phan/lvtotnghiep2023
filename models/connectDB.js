const { Sequelize } = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASS}`, {
  host: `${process.env.DB_USER}`,
  dialect: "mysql",
  dialectOptions: {
    ssl: {
        rejectUnauthorized: true,        
    }
}
});
let connectDB = async() => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = connectDB;
