const express = require("express");
const router = express.Router(); // navigation
const random = require("randomString");
const connection = require("../../public/connection.js"); // use connection
const middleware = require("../middleware/cart.middleware.js");
let query;
router.get("/", (req, res) => {
  query = ` select * from orders where is_Active = 1`;
  connection.query(query, (err, result) => {
    if (err) return res.status(400).json({ success: false, message: "error" });
    if (result.length > 0) {
      return res
        .status(200)
        .json({ success: true, message: "success", order: result });
    }
  });
});
router.get("/:id", middleware.checkId, (req, res) => {
  const id = req.params.id;
  getUser = `select * from users where visible_id='${id}' and is_Active = 1`;
  query = ` select * from orders where order_code_customer = '${id}' and is_Active = 1`;
  connection.query(getUser, (err, result) => {
    if (err) return res.status(400).json({ success: false, message: "err" });
    if (result.length > 0) {
      let name = result[0].username;
      let phone = result[0].phone;
      let address = result[0].address;
      connection.query(query, (error, results) => {
        if (error)
          return res.status(400).json({ success: false, message: "error" });
        if (results.length > 0) {
          return res.status(200).json({
            success: true,
            message: "success",
            name,
            phone,
            address,
            order: results,
          });
        }
        return res.status(200).json({
          success: false,
          message: "empty order",
          name,
          phone,
          address,
          order: [],
        });
      });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "user not found" });
    }
  });
});
router.post("/:id", middleware.checkId, (req, res) => {
  const id = req.params.id;
  const order_code = random.generate(20);
  const order_address = req.body.order_address;
  query = `insert into orders (order_code,order_code_customer,order_address)
                    values('${order_code}',
                           '${id}',
                           '${order_address}')`;
  connection.query(query, (err, result) => {
    if (err) return res.status(400).json({ success: false, message: "err" });
    return res.status(200).json({
      success: true,
      message: "success",
      order_code,
      order_code_customer: id,
      order_address,
    });
  });
});
router.patch("/status", (req, res) => {
  const { order_code, order_code_customer, order_status } = req.body;
  query = `update orders set order_status = '${order_status}' where order_code ='${order_code}' and 
  order_code_customer ='${order_code_customer}'`;
  connection.query(query, (err, result) => {
    if (err)
      return res.status(400).json({ success: false, message: "err update" });
    return res
      .status(200)
      .json({ success: false, message: "update status success" });
  });
});
// router.delete("/:id", (req, res) => {
//   const id = req.params.id;
//   let checkPro_id = `select visible_id from product where visible_id = '${id}'
//                                 and is_Active = 1`;
//   query = `update product set is_Active = 0 where visible_id = '${id}'`;
//   connection.query(checkPro_id, (err, result) => {
//     if (err) return res.status(400).json({ success: false, message: "err" });
//     if (result.length > 0) {
//       connection.query(query, (error, Result) => {
//         if (error)
//           return res
//             .status(400)
//             .json({ success: false, message: "err checkPro_id" });
//         return res
//           .status(200)
//           .json({ success: true, message: "Delete success", data: id });
//       });
//     } else {
//       return res.status(400).json({ success: false, message: "Id not found" });
//     }
//   });
// });

module.exports = router;
