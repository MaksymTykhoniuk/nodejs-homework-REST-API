const { joiChangeUserSubscriptionSchema } = require("../../validation/users");
const User = require("../../models/users");

const updateSubscription = async (req, res, next) => {
  try {
    const { error } = joiChangeUserSubscriptionSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Missing field subscription or value is not valid",
      });
      return;
    }

    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
