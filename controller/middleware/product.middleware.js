const express = require("express");
const connection = require("../../public/connection.js");
let query;

let middleware = {
  checkProduct: (req, res, next) => {
    let pro_name = req.body.pro_name;
    query = `select pro_name from product where pro_name = '${pro_name}' and is_Active = 1`;
    connection.query(query, (error, result) => {
      if (error)
        return res
          .status(400)
          .json({ success: false, message: "error checkProduct" });
      if (result.length > 0) {
        return res
          .status(400)
          .json({ success: false, message: "Product already exists" });
      } else {
        next();
      }
    });
  },
  checkValue: (req, res, next) => {
    const id = req.params.id;
    getValue = ` select * from product where visible_id = '${id}' and is_Active = 1`;
    getImage = ` select image_path from image where image_pro_id = '${id}' and is_Active = 1 `;
    connection.query(getValue, (err, result) => {
      if (err)
        return res
          .status(400)
          .json({ success: false, message: "error getValue" });
      if (result.length > 0) {
        let old_pro_name = result[0].pro_name;
        let old_pro_type = result[0].pro_type;
        let old_pro_nutritional = result[0].pro_nutritional;
        let old_pro_price = result[0].pro_price;
        if (req.body.pro_name == "") req.body.pro_name = old_pro_name;
        if (req.body.pro_type == "") req.body.pro_type = old_pro_type;
        if (req.body.pro_nutritional == "")
          req.body.pro_nutritional = old_pro_nutritional;
        if (req.body.pro_price == "") req.body.pro_price = old_pro_price;
        connection.query(getImage, (err, results) => {
          if (err)
            return res
              .status(400)
              .json({ success: false, message: "error getImage" });
          if (results.length > 0) {
            let old_image_path = results[0].image_path;
            if (req.body.image_path == "") req.body.image_path = old_image_path;
            next();
          } else {
            return res
              .status(401)
              .json({ success: false, message: "image not found" });
          }
        });
      } else {
        return res
          .status(401)
          .json({ success: false, message: "id not found" });
      }
    });
  },
};
module.exports = middleware;
