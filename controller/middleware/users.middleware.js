const express = require("express");
const connection = require("../../public/connection.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let middleware = {
  checkUser: (req, res, next) => {
    let username = req.body.username;
    query = `select username from users where username = '${username}' and is_Active = 1`;
    connection.query(query, (error, result) => {
      if (error)
        return res
          .status(400)
          .json({ success: false, message: "error checkUser" });
      if (result.length > 0) {
        return res
          .status(400)
          .json({ success: false, message: "User already exists" });
      } else {
        next();
      }
    });
  },
  checkEmail: (req, res, next) => {
    let email = req.body.email;
    regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regexEmail.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please check email" });
    }
    query = `select email from users where email = '${email}' and is_Active = 1`;
    connection.query(query, (error, result) => {
      if (error)
        return res
          .status(400)
          .json({ success: false, message: "error checkEmail" });
      if (result.length > 0) {
        return res
          .status(400)
          .json({ success: false, message: "Email already exists" });
      } else {
        next();
      }
    });
  },
  checkEmailOTP: (req, res, next) => {
    let email = req.body.email;
    regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regexEmail.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please check email" });
    }
    query = `select email from users where email = '${email}' and is_Active = 1`;
    connection.query(query, (error, result) => {
      if (error)
        return res
          .status(400)
          .json({ success: false, message: "error checkEmail" });
      if (result.length > 0) {
        next();
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Email not found" });
      }
    });
  },
  checkPhone: (req, res, next) => {
    let phone = req.body.phone;
    regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (!regexPhone.test(phone)) {
      return res
        .status(400)
        .json({ success: false, message: "Please check phone" });
    }
    query = `select phone from users where phone = '${phone}' and is_Active = 1`;
    connection.query(query, (error, result) => {
      if (error)
        return res
          .status(400)
          .json({ success: false, message: "error checkPhone" });
      if (result.length > 0) {
        return res
          .status(400)
          .json({ success: false, message: "Phone already exists" });
      } else {
        next();
      }
    });
  },
  bcrypt: async (req, res, next) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.passwords, salt);
      req.body.passwords = hashedPassword;
      next();
    } catch (err) {
      return res.status(400).json({ success: false, message: "err" });
    }
  },
  verifyToken: (req, res, next) => {
    //  const authHeader = req.header("myToken");
    const token = req.cookies.jwt_ad;
    // const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.redirect("/login");
    }
    try {
      const decoded = jwt.verify(token, process.env.ID);
      visible_id = decoded.visible_id;
      username = decoded.username;
      next();
    } catch (error) {
      return res.redirect("/login");
    }
  },
  verifyTokenLogin: (req, res, next) => {
    //  const authHeader = req.header("myToken");
    const token = req.cookies.jwt_ad;
    // const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      next();
    }
    try {
      const decoded = jwt.verify(token, process.env.ID);
      visible_id = decoded.visible_id;
      username = decoded.username;
      res.redirect("/admin");
    } catch (error) {
      next();
    }
  },
  verifyTokenUser: (req, res, next) => {
    //  const authHeader = req.header("myToken");
    const token = req.cookies.jwt_us;
    // const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.redirect("/login_user");
    }
    try {
      const decoded = jwt.verify(token, process.env.ID);
      visible_id = decoded.visible_id;
      next();
    } catch (error) {
      return res.redirect("/login_user");
    }
  },
  verifyTokenUserLogin: (req, res, next) => {
    //  const authHeader = req.header("myToken");
    const token = req.cookies.jwt_us;
    // const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      next();
    }
    try {
      const decoded = jwt.verify(token, process.env.ID);
      visible_id = decoded.visible_id;
      res.redirect("/login_user_success");
    } catch (error) {
      next();
    }
  },
};
module.exports = middleware;
