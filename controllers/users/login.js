const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { joiUserLoginSchema } = require("../../validation/users");
const User = require("../../models/users");

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { error } = joiUserLoginSchema.validate(req.body);

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

    if (!user) {
      res.status(401).json({
        status: "error",
        code: 401,
        message: "Email is wrong",
      });
      return;
    }

    const comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      res.status(401).json({
        status: "error",
        code: 401,
        message: "Password is wrong",
      });
      return;
    }

    if (!user.verify) {
      res.status(401).json({
        status: "error",
        code: 401,
        message: "Email is not verified",
      });
      return;
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      status: "success",
      code: 200,
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
