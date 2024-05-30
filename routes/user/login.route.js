const Joi = require("joi");
const bcrypt = require("bcrypt");
const Admin = require("../../model/user/adminModel");
const Staff = require("../../model/user/staffModel");
const express = require("express");
const route = express.Router();

route.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  const { error } = validateUser(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
   
    const admin = await Admin.findOne({ email: email });
    const staff = await Staff.findOne({ email: email });
    if (!admin && !staff) return res.status(400).json({ error: "User does not exist" });

    const user = admin || staff;

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "Invalid email or password" });

    await user.populate('role')
    const token = user.generateAuthToken();

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
});

// Validation function
function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(user);
}

module.exports = route;
