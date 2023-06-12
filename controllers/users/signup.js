const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuid } = require("uuid");
const { sendEmail } = require("../../helpers");

const { joiUserSignupSchema } = require("../../validation/users");
const User = require("../../models/users");
const { EMAIL } = process.env;

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

    const avatarUrl = gravatar.url(email);

    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const verificationToken = uuid();

    const result = await User.create({
      ...req.body,
      password: hashedPassword,
      avatarUrl,
      verificationToken,
    });

    const mail = {
      to: email,
      from: EMAIL,
      subject: "Email verification",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Click</a>`,
    };

    await sendEmail(mail);

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
