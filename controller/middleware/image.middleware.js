const express = require("express");
const connection = require("../../public/connection.js");
let query;

let middleware = {
  checkProduct: (req, res, next) => {
    const image_pro_id = req.body.image_pro_id;
    query = `select visible_id from product where visible_id='${image_pro_id}' and is_Active = 1`;
    connection.query(query, (error, result) => {
      if (error)
        return res.status.json({
          success: false,
          message: "error checkProduct",
        });
      if (result.length > 0) {
        next();
      } else {
        return res
          .status(400)
          .json({ success: false, message: "product not found" });
      }
    });
  },
};
module.exports = middleware;
