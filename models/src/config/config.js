require('dotenv').config(); // this is important!
module.exports = {
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "dialect": "mysql",
        "dialectOptions": {
            "ssl": {
              "required": false,
            },
          },
      },
      "test": {
        "username": process.env.DB_USERNAME_TEST,
        "password": process.env.DB_PASSWORD_TEST,
        "database": process.env.DB_DATABASE_TEST,
        "host": process.env.DB_HOST_TEST,
        "dialect": "mysql"
      },
      "production": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "host": process.env.DB_HOST,
        "dialect": "mysql",
        "dialectOptions": {
            "ssl": {
              "rejectUnauthorized": true,
            },
          },
      }
};