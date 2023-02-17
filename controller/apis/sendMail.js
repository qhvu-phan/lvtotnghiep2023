const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const middleware = require("../middleware/users.middleware.js");
const check = [middleware.checkPhone, middleware.checkEmail];
router.post("/", check, (req, res) => {
  const { email, phone } = req.body;
  let code = Math.floor(Math.random() * 600000) + 300000;
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "main.traversymedia.com",
    port: 587,
    secure: false,
    auth: {
      user: "bachhoachangsen@gmail.com",
      pass: "PQHV1201",
    },
  });

  // send mail with defined transport object
  let info = {
    from: '"Bách hóa Chàng Sen"',
    to: email,
    subject: `${code} là mã xác nhận của bạn`,
    html: `<h4>Bách Hóa Chàng Sen kính chào quý khách</h4> </br> 
    <p>Vui lòng không tiết lộ mã xác nhận cho bất kì ai.</p> </br>
    <p>Mã xác nhận của quý khách là: ${code} </p>`,
  };
  transporter.sendMail(info, (error, success) => {
    if (error) {
      return res.status(400).json({ success: false, message: "error" });
    }
    return res.status(200).json({ success: true, message: "success", code });
  });
});
router.post("/getOTP", middleware.checkEmailOTP, (req, res) => {
  const email = req.body.email;
  let code = Math.floor(Math.random() * 600000) + 300000;
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "main.traversymedia.com",
    port: 587,
    secure: false,
    auth: {
      user: "bachhoachangsen@gmail.com",
      pass: "PQHV1201",
    },
  });

  // send mail with defined transport object
  let info = {
    from: '"Bách hóa Chàng Sen"',
    to: email,
    subject: `${code} là mã xác nhận của bạn`,
    html: `<h4>Bách Hóa Chàng Sen kính chào quý khách</h4> </br> 
    <p>Vui lòng không tiết lộ mã xác nhận cho bất kì ai.</p> </br>
    <p>Mã xác nhận của quý khách là: ${code} </p>`,
  };
  transporter.sendMail(info, (error, success) => {
    if (error) {
      return res.status(400).json({ success: false, message: "error" });
    }
    return res.status(200).json({ success: true, message: "success", code });
  });
});
module.exports = router;
