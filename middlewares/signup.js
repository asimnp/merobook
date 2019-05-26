const Joi = require("@hapi/joi");

// Model
const User = require("../models/User");

module.exports = (req, res, next) => {
  // Joi Schema
  const JoiSchema = {
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .min(8)
      .required(),
    confirm: Joi.string()
      .min(8)
      .required()
  };

  Joi.validate(req.body, JoiSchema, (err, value) => {
    if (err) {
      const joiError = err.details[0].message;
      req.flash("signupError", joiError);
      return res.redirect("/auth/signup");
    }
  });

  // Destruct req.body
  const { email, password, confirm } = req.body;

  // Check User already exists or not
  User.findOne({ email })
    .then(user => {
      if (user) {
        req.flash("signupError", "User already exists. Go to Login page");
        return res.redirect("/auth/signup");
      } else {
        // Check password & confirm match or not
        if (password !== confirm) {
          req.flash("signupError", "Passwor and Confirm not match");
          return res.redirect("/auth/signup");
        } else {
          next();
        }
      }
    })
    .catch(err => console.log(err.message));
};
