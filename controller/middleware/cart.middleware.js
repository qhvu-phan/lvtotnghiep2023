const express = require("express");
const connection = require("../../public/connection.js");
let query;
let middleware = {
  checkId: (req, res, next) => {
    const id = req.params.id;
    if (id.length > 20 || id.length < 20)
      return res.status(400).json({ success: false, message: "invalid id" });
    query = `select visible_id from users where visible_id='${id}' and is_Active = 1`;
    connection.query(query, (error, result) => {
      if (error)
        return res
          .status(400)
          .json({ success: false, message: "error checkUser" });
      if (result.length > 0) {
        next();
      } else {
        return res
          .status(400)
          .json({ success: false, message: "user not found" });
      }
    });
  },
  checkProduct: (req, res, next) => {
    let cart_pro_id = req.body.cart_pro_id;
    query = `select visible_id from product where visible_id = '${cart_pro_id}' and is_Active = 1`;
    connection.query(query, (error, result) => {
      if (error)
        return res
          .status(400)
          .json({ success: false, message: "error checkProduct" });
      if (result.length > 0) {
        next();
      } else {
        return res
          .status(200)
          .json({ success: false, message: "product not found" });
      }
    });
  },
  checkUserid: (req, res, next) => {
    let cart_user_id = req.body.cart_user_id;
    query = `select visible_id from users where visible_id='${cart_user_id}' and is_Active = 1`;
    connection.query(query, (error, result) => {
      if (error)
        return res
          .status(400)
          .json({ success: false, message: "error checkUser" });
      if (result.length > 0) {
        next();
      } else {
        return res
          .status(200)
          .json({ success: false, message: "user not found" });
      }
    });
  },
  checkProductInCart: (req, res, next) => {
    let cart_user_id = req.body.cart_user_id;
    let cart_pro_id = req.body.cart_pro_id;
    query = `select cart_pro_id from cart where cart_user_id='${cart_user_id}' and cart_pro_id='${cart_pro_id}' and is_Active = 1`;
    connection.query(query, (error, result) => {
      if (error)
        return res
          .status(400)
          .json({ success: false, message: "error checkProductInCart" });
      if (result.length > 0) {
        return res
          .status(200)
          .json({ success: false, message: "Product already exists" });
      } else {
        next();
      }
    });
  },
};
module.exports = middleware;
