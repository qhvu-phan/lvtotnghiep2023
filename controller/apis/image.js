const express = require("express");
const router = express.Router();
const connection = require("../../public/connection.js");
const random = require("randomString");
const middleware = require("../middleware/image.middleware.js");
let query;

router.post("/", middleware.checkProduct, (req, res) => {
  const id = random.generate(20);
  const { image_pro_id, image_name, image_path, image_size } = req.body;
  query = `insert into image (visible_id,image_pro_id,image_name,image_path,image_size)
                    values( '${id}}',
                            '${image_pro_id}',
                            '${image_name}',
                            '${image_path}',
                            '${image_size}')`;
  connection.query(query, (err, result) => {
    if (err)
      return res.status(400).json({
        success: false,
        message: "error",
      });
    return res.status(200).json({
      success: true,
      message: "success",
      data: image_pro_id,
      image_name,
      image_path,
      image_size,
    });
  });
});
router.get("/", (req, res) => {
  query = ` select * from image where is_Active = 1`;
  connection.query(query, (err, result) => {
    if (err) return res.status(400).json({ success: false, message: "error" });
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        message: " success!",
        data: result,
      });
    } else {
      return res.status(400).json({ success: false, message: "image empty" });
    }
  });
});
router.get("/:id", (req, res) => {
  const id = req.params.id;
  query = ` select * from image where image_pro_id = '${id}' and is_Active = 1`;
  connection.query(query, (err, result) => {
    if (err) return res.status(400).json({ success: false, message: "error" });
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        message: " success!",
        data: result,
      });
    } else {
      return res.status(400).json({ success: false, message: "Id not found" });
    }
  });
});

module.exports = router;
