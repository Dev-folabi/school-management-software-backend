const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../../model/user/usersModel");
const express = require("express");
const route = express.Router();

route.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json("email and password is required");

  const { error } = await validateUser(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json("User not exist");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json("Invalid email or password");

    const token = user.generateAuthToken();

    res.status(200).json(token);
  } catch (error) {
    res.status(404).json(`internal error ${error.message}`);
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
