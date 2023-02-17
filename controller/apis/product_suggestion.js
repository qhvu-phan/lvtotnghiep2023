const express = require("express");
const router = express.Router();
const connection = require("../../public/connection.js");
let query;

router.post("/:type", (req, res) => {
  const type = req.params.type;
  let money = req.body.money;
  let listProduct = [];
  let listProducts = [];
  let suggestion = [];
  query = ` select * from product where pro_type='${type}' and is_Active = 1`;
  connection.query(query, (err, result) => {
    if (err) return res.status(400).json({ success: false, message: "error" });
    if (result.length > 0) {
      for (let i = 0; i < result.length; i++) {
        let visible_id = result[i].visible_id;
        let pro_name = result[i].pro_name;
        let pro_type = result[i].pro_type;
        let pro_nutritional = result[i].pro_nutritional;
        let pro_description = result[i].pro_description;
        let pro_price = result[i].pro_price;
        let getImage = ` select * from image where image_pro_id=
                                                                   '${visible_id}' and is_Active = 1 `;
        connection.query(getImage, function (error, results) {
          if (error)
            return res
              .status(400)
              .json({ success: false, message: "Error getImage" });
          let product = {
            image_path: results[0].image_path,
            visible_id: visible_id,
            pro_name: pro_name,
            pro_type: pro_type,
            pro_nutritional: pro_nutritional,
            pro_description: pro_description,
            pro_price: pro_price,
            quantity: 0,
            nutritional: parseFloat((pro_nutritional / pro_price).toFixed(4)),
          };
          listProduct.push(product);
          listProducts.push(product);
          // sort max nutritional
          if (i === result.length - 1) {
            for (let k = 0; k < listProduct.length - 1; k++) {
              for (let v = k + 1; v < listProduct.length; v++) {
                if (listProduct[v].nutritional > listProduct[k].nutritional) {
                  let temp = listProduct[v];
                  listProduct[v] = listProduct[k];
                  listProduct[k] = temp;
                }
              }
            }
            // sort max price
            for (let k = 0; k < listProducts.length - 1; k++) {
              for (let v = k + 1; v < listProducts.length; v++) {
                if (listProducts[v].pro_price > listProducts[k].pro_price) {
                  let temp = listProducts[v];
                  listProducts[v] = listProducts[k];
                  listProducts[k] = temp;
                }
              }
            }
            let x = listProducts.length - 1;
            let count = 0;
            if (money > listProducts[x].pro_price) {
              for (let t = 0; t < listProduct.length; t++) {
                let moneys = parseInt(money - listProduct[t].pro_price);
                if (moneys > 0 || moneys == 0) {
                  listProduct[t].quantity = 1;
                  money = parseInt(
                    money - listProduct[t].quantity * listProduct[t].pro_price
                  );
                  suggestion.push(listProduct[t]);
                  count++;
                }
              }
              return res.status(200).json({
                success: true,
                message: "success",
                suggestion,
                money,
                count,
              });
            }
            return res
              .status(200)
              .json({ success: false, message: "money very small", money });
          }
        });
      }
    } else {
      return res.status(400).json({ success: false, message: "invalid type" });
    }
  });
});

module.exports = router;
