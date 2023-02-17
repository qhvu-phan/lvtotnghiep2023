const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const app = express();

let mysql = require('mysql2');

let conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
    },
  },
});
function initApp() {
  let sql2 = "create database bachhoachangsen"
  conn.query(sql2, (err, result) => {
    if (err) throw err
    console.log("init database successfully! Press Crtl+C and Y \n use: 'npm run init_table' to create all tables")
  })
}
initApp();

app.listen(3000);
