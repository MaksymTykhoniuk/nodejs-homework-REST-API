const bcrypt = require("bcryptjs");
const { joiUserSignupSchema } = require("../../validation/users");
const User = require("../../models/users");

const signup = async (req, res, next) => {
  try {
    const { error } = joiUserSignupSchema.validate(req.body);

    if (error) {
      console.log(error);
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Bad request",
      });
      return;
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      res.status(409).json({
        status: "error",
        code: 409,
        message: "Email in use",
      });
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const result = await User.create({ ...req.body, password: hashedPassword });
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Created",
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
