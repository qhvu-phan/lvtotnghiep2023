const express = require("express");
const router = express.Router();
const connection = require("../../public/connection.js");
const random = require("randomString");
const middleware = require("../middleware/users.middleware.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let query;

router.get("/", (req, res) => {
  query = `select * from users where is_Active = 1`;
  connection.query(query, (error, result) => {
    if (error)
      return res.status(400).json({ success: false, message: "error" });
    if (result.length > 0) {
      return res.status(200).json([result]);
    } else {
      return res.status(400).json({ success: false, message: "!users" });
    }
  });
});
router.get("/:id", (req, res) => {
  const id = req.params.id;
  query = `select * from users where visible_id ='${id}' and is_Active = 1`;
  connection.query(query, (error, result) => {
    if (error)
      return res.status(400).json({ success: false, message: "error" });
    if (result.length > 0) {
      return res
        .status(200)
        .json({ success: true, message: "success", user: result });
    } else {
      return res.status(400).json({ success: false, message: "!users" });
    }
  });
});
const check = [middleware.checkPhone, middleware.checkEmail, middleware.bcrypt];
router.post("/register", check, (req, res) => {
  const visible_id = random.generate(20);
  const { username, passwords, email, phone, address } = req.body;
  query = `insert into users(visible_id,username,passwords,email,phone,address)
                    values('${visible_id}','${username}','${passwords}','${email}','${phone}','${address}')`;
  connection.query(query, async (error, result) => {
    if (error)
      return res.status(400).json({ success: false, message: "error" });
    const accessToken = await jwt.sign({ visible_id, phone }, process.env.ID);
    return res.status(200).json({
      success: true,
      message: "register success",
      accessToken,
    });
  });
});

router.post("/login", (req, res) => {
  const phone = req.body.phone;
  query = `select * from users where phone='${phone}' and is_Active = 1`;
  connection.query(query, async (error, result) => {
    if (error)
      return res.status(400).json({ success: false, message: "error" });
    if (result.length > 0) {
      let visible_id = result[0].visible_id;
      let phone = result[0].phone;
      const verify = await bcrypt.compare(
        req.body.passwords,
        result[0].passwords
      );
      if (verify) {
        const accessToken = jwt.sign({ visible_id, phone }, process.env.ID);
        return res.status(200).json({
          success: true,
          message: "login success",
          accessToken,
        });
      }
      return res
        .status(400)
        .json({ success: false, message: "invalid password" });
    } else {
      return res.status(400).json({ success: false, message: "invalid users" });
    }
  });
});
router.post("/loginAdmin", (req, res) => {
  const username = req.body.username;
  query = `select * from users where username='${username}' and is_Active = 1`;
  connection.query(query, async (error, result) => {
    if (error)
      return res.status(400).json({ success: false, message: "error" });
    if (result.length > 0) {
      let visible_id = result[0].visible_id;
      let username = result[0].username;
      const verify = await bcrypt.compare(
        req.body.passwords,
        result[0].passwords
      );
      if (verify) {
        const accessToken = jwt.sign({ visible_id, username }, process.env.ID);
        return res.status(200).json({
          success: true,
          message: "login success",
          accessToken,
        });
      }
      return res
        .status(400)
        .json({ success: false, message: "invalid password" });
    } else {
      return res.status(400).json({ success: false, message: "invalid users" });
    }
  });
});
router.patch("/:email", middleware.bcrypt, (req, res) => {
  const email = req.params.email;
  const passwords = req.body.passwords;
  query = `select * from users where email='${email}' and is_Active = 1`;
  let changePassword = `update users set passwords = '${passwords}' where email='${email}' and is_Active = 1`;
  connection.query(query, async (error, result) => {
    if (error)
      return res.status(400).json({ success: false, message: "error" });
    if (result.length > 0) {
      connection.query(changePassword, (err, results) => {
        if (err)
          return res.status(400).json({ success: false, message: "error" });
        return res
          .status(200)
          .json({ success: true, message: "success", passwords });
      });
    } else {
      return res.status(400).json({ success: false, message: "invalid users" });
    }
  });
});
module.exports = router;
