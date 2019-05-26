const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");

// Model
const User = require("../models/User");

module.exports = (req, res, next) => {
  // Destruct req.body
  const { email, password } = req.body;

  // Joi Schema
  const joiSchema = {
    email: Joi.string().required(),
    password: Joi.string()
      .min(8)
      .required()
  };

  // Joi Validate
  Joi.validate(req.body, joiSchema, (err, value) => {
    if (err) {
      req.flash("loginError", "Please enter valid Email and Password");
      return res.redirect("/auth/login");
    }
  });

  // User exists or not
  User.findOne({ email }).then(user => {
    if (!user) {
      req.flash("loginError", "Please enter valid Email and Password");
      return res.redirect("/auth/login");
    } else {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (!isMatch) {
          req.flash("loginError", "Please enter valid Email and Password");
          return res.redirect("/auth/login");
        } else {
          req.session.userId = user._id;
          next();
        }
      });
    }
  });
};
