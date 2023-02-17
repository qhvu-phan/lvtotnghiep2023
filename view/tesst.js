const fs = require("fs");
const path = require("path");
const axios = require("axios");
const localStorage = require("local-storage");
const verify = require("../controller/middleware/users.middleware.js");
require("dotenv").config();

module.exports = (app) => {
  app.get("/", (req, res) => {
    let fileName = "index.ejs";
    fs.readFile(path.resolve(__dirname, fileName), async (err, data) => {
      if (err) {
        return res.render("index.ejs");
      }
      const vegetable = await axios.get(
        `${process.env.LOCALHOST}/${process.env.PRODUCT}/?${process.env.TYPE}=${process.env.VEGETABLE}`
      );
      const fruit = await axios.get(
        `${process.env.LOCALHOST}/${process.env.PRODUCT}/?${process.env.TYPE}=${process.env.FRUIT}`
      );
      const meat = await axios.get(
        `${process.env.LOCALHOST}/${process.env.PRODUCT}/?${process.env.TYPE}=${process.env.MEAT}`
      );
      const noodles = await axios.get(
        `${process.env.LOCALHOST}/${process.env.PRODUCT}/?${process.env.TYPE}=${process.env.NOODLES}`
      );
      return res.render(fileName, {
        data: {
          vegetable: vegetable.data.product,
          fruit: fruit.data.product,
          meat: meat.data.product,
          noodles: noodles.data.product,
        },
      });
    });
  });
  app.get("/cart", verify.verifyTokenUser, (req, res) => {
    let fileName = "cart.ejs";
    fs.readFile(path.resolve(__dirname, fileName), async (err, data) => {
      if (err) {
        return res.render("cart.ejs");
      }
      const cart = await axios.get(
        `${process.env.LOCALHOST}/${process.env.CART}/${visible_id}`
      );
      return res.render(fileName, {
        data: {
          cart: cart.data.product,
        },
      });
    });
  });
  app.get("/vegetable", (req, res) => {
    let fileName = "vegetable.ejs";
    fs.readFile(path.resolve(__dirname, fileName), async (err, data) => {
      if (err) {
        return res.render("vegetable.ejs");
      }
      const vegetable = await axios.get(
        `${process.env.LOCALHOST}/${process.env.PRODUCT}/?${process.env.TYPE}=${process.env.VEGETABLE}`
      );
      return res.render(fileName, {
        data: {
          vegetable: vegetable.data.product,
        },
      });
    });
  });
  app.get("/fruit", (req, res) => {
    let fileName = "fruit.ejs";
    fs.readFile(path.resolve(__dirname, fileName), async (err, data) => {
      if (err) {
        return res.render("fruit.ejs");
      }
      const fruit = await axios.get(
        `${process.env.LOCALHOST}/${process.env.PRODUCT}/?${process.env.TYPE}=${process.env.FRUIT}`
      );
      return res.render(fileName, {
        data: {
          fruit: fruit.data.product,
        },
      });
    });
  });
  app.get("/meat", (req, res) => {
    let fileName = "meat.ejs";
    fs.readFile(path.resolve(__dirname, fileName), async (err, data) => {
      if (err) {
        return res.render("meat.ejs");
      }
      const meat = await axios.get(
        `${process.env.LOCALHOST}/${process.env.PRODUCT}/?${process.env.TYPE}=${process.env.MEAT}`
      );
      return res.render(fileName, {
        data: {
          meat: meat.data.product,
        },
      });
    });
  });
  app.get("/noodles", (req, res) => {
    let fileName = "noodles.ejs";
    fs.readFile(path.resolve(__dirname, fileName), async (err, data) => {
      if (err) {
        return res.render("noodles.ejs");
      }
      const noodles = await axios.get(
        `${process.env.LOCALHOST}/${process.env.PRODUCT}/?${process.env.TYPE}=${process.env.NOODLES}`
      );
      return res.render(fileName, {
        data: {
          noodles: noodles.data.product,
        },
      });
    });
  });
};
