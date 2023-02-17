const express = require("express");
const router = express.Router(); // navigation
const random = require("randomString");
const connection = require("../../public/connection.js"); // use connection
const order_details_middleware = require("../middleware/order_details.middleware.js");
let query;
const check = [
  order_details_middleware.checkId,
  order_details_middleware.checkOrder,
];
router.post("/order_details", check, (req, res) => {
  const { cart_user_id, cart_order_code } = req.body;
  let product = [];
  query = `select * from cart where cart_user_id='${cart_user_id}' and cart_order_code ='${cart_order_code}' and is_Active = 0`;
  connection.query(query, (error, result) => {
    if (error)
      return res.status(400).json({ success: false, message: "error" });
    if (result.length > 0) {
      let cart_order_code = result[0].cart_order_code;
      for (let i = 0; i < result.length; i++) {
        let visible_id = result[i].visible_id;
        let cart_user_id = result[i].cart_user_id;
        let cart_pro_id = result[i].cart_pro_id;
        let cart_pro_quantity = result[i].cart_pro_quantity;
        let getProduct = ` select * from product where visible_id ='${cart_pro_id}' and is_Active = 1`;
        connection.query(getProduct, (err, results) => {
          if (err)
            return res.status(400).json({ success: false, message: "error" });
          for (let k = 0; k < results.length; k++) {
            let visible_id_pro = results[k].visible_id;
            let pro_name = results[k].pro_name;
            let pro_type = results[k].pro_type;
            let pro_nutritional = result[k].pro_nutritional;
            let pro_description = results[k].pro_description;
            let pro_price = results[k].pro_price;
            let getImgae = `select image_path from image where image_pro_id='${visible_id_pro}' and is_Active = 1`;
            connection.query(getImgae, (error, resultss) => {
              if (error)
                return res
                  .status(400)
                  .json({ success: false, message: "error" });
              let cache = {
                visible_id: visible_id,
                cart_user_id: cart_user_id,
                visible_id_pro: visible_id_pro,
                image_path: resultss[0].image_path,
                pro_name: pro_name,
                pro_type: pro_type,
                pro_nutritional: pro_nutritional,
                pro_description: pro_description,
                pro_price: pro_price,
                pro_quantity: cart_pro_quantity,
              };
              product.push(cache);
              if (i === result.length - 1)
                return res.status(200).json({
                  success: true,
                  message: "success",
                  cart_order_code,
                  product: product,
                });
            });
          }
        });
      }
    } else {
      return res
        .status(200)
        .json({ success: false, message: "empty basket", product: [] });
    }
  });
});

// router.patch("/:id", (req, res) => {
//   const id = req.params.id;
//   const { pro_name, pro_type, pro_nutritional, pro_price, image_path } =
//     req.body;
//   let checkPro_id = `select visible_id from product where visible_id = '${id}'
//     and is_Active = 1`;
//   query = `update product set
//              pro_name = '${pro_name}',
//              pro_type = '${pro_type}',
//              pro_nutritional = '${pro_nutritional}',
//              pro_price = ${pro_price}
//              where visible_id ='${id}' and is_Active = 1`;
//   imageUpdate = `update image set image_path ='${image_path}'
//              where image_pro_id='${id}' and is_Active = 1`;
//   connection.query(checkPro_id, (err, result) => {
//     if (err)
//       return res
//         .status(400)
//         .json({ success: false, message: "err checkPro_id" });
//     if (result.length > 0) {
//       connection.query(query, (error, result) => {
//         if (error)
//           return res.status(400).json({ success: false, message: "error" });
//         connection.query(imageUpdate, (errors, resultss) => {
//           if (errors)
//             return res.status(400).json({ success: false, message: "errorr" });
//           return res.status(200).json({
//             success: true,
//             message: "success",
//             visible_id: id,
//             pro_name,
//             pro_type,
//             pro_nutritional,
//             pro_price,
//             image_path,
//           });
//         });
//       });
//     } else {
//       return res.status(400).json({ success: false, message: "id not found" });
//     }
//   });
// });
router.delete("/all", order_details_middleware.checkId, (req, res) => {
  const cart_user_id = req.body.cart_user_id;
  query = `delete from cart where cart_user_id = '${cart_user_id}' and is_Active = 1`;
  connection.query(query, (error, Result) => {
    if (error)
      return res.status(400).json({ success: false, message: "err error" });
    return res
      .status(200)
      .json({ success: true, message: "Delete all success", cart_user_id });
  });
});

module.exports = router;
