const User = require("../../models/users");

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;

    await User.findByIdAndUpdate(_id, { token: null });

    res.status(401).json({ message: "Unauthorized" });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
