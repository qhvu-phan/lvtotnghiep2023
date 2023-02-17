const mysql = require('mysql2');
require("dotenv").config();
// create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
      required: false,
    },
  },
});
connection.connect(function (err) {
    if (err) {
        console.log(err);
        throw err;
    };
    console.log('Database is connected successfully !');
});

module.exports = connection;
