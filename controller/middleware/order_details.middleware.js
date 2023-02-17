const express = require("express");
const connection = require("../../public/connection.js");
let query;
let middleware = {
  checkId: (req, res, next) => {
    const cart_user_id = req.body.cart_user_id;
    if (cart_user_id.length > 20 || cart_user_id.length < 20)
      return res.status(400).json({ success: false, message: "invalid id" });
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
          .status(400)
          .json({ success: false, message: "user not found" });
      }
    });
  },
  checkOrder: (req, res, next) => {
    const cart_order_code = req.body.cart_order_code;
    if (cart_order_code.length > 20 || cart_order_code.length < 20)
      return res.status(400).json({ success: false, message: "invalid id" });
    query = `select order_code from orders where order_code='${cart_order_code}' and is_Active = 1`;
    connection.query(query, (error, result) => {
      if (error)
        return res
          .status(400)
          .json({ success: false, message: "error checkOrder" });
      if (result.length > 0) {
        next();
      } else {
        return res
          .status(400)
          .json({ success: false, message: "order not found" });
      }
    });
  },
};
module.exports = middleware;
