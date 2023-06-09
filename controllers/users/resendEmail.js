const User = require("../../models/users");
const sendEmail = require("../../helpers");

const resendEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: "missing required field email" });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    if (user.verify) {
      res.status(400).json({ message: "Verification has already been passed" });
      return;
    }

    const verificationToken = user.verificationToken;

    const mail = {
      to: email,
      subject: "Email verification",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Click</a>`,
    };

    await sendEmail(mail);

    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

module.exports = resendEmail;
