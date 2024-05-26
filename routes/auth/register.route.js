// const _ = require("lodash")
// const { User, validateUser } = require("../../model/user/usersModel");
// const mongoose = require("mongoose");
// const bcrypt = require('bcrypt');
const express = require("express");
const { createAdmin, getAdmins } = require('../../api/controllers/adminController')
const router = express.Router();


router.post("/", createAdmin )
router.get("/", getAdmins)

// router.post("/", async (req, res) => {

//   const { firstName, lastName, email, password } = req.body;
//   const { error } = validateUser(req.body);
//   if (error) return res.status(400).json(error.details[0].message);

//   let user = await User.findOne({ email: email });
//   if (user) return res.status(400).json("User already exist");

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt)

//   user = await new User({
//     firstName: firstName,
//     lastName: lastName,
//     email: email,
//     password: hashedPassword,
//   });
// await user.save();

// const token = user.generateAuthToken()
//   res.json(token);
// });

module.exports = router;
