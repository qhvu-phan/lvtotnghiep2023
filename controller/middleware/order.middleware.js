const express = require("express");
const connection = require("../../public/connection.js");
let query;
let middleware = {
  checkOrder: (req, res, next) => {
    const id = req.params.id;
    if (id.length > 20 || id.length < 20)
      return res.status(400).json({ success: false, message: "invalid id" });
    query = `select order_code from orders where order_code='${id}' and is_Active = 1`;
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
