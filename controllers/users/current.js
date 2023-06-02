const getCurrentUser = async (req, res) => {
  res.status(200).json({
    stauts: "success",
    code: 200,
    data: {
      user: {
        email: req.user.email,
        subscription: req.user.subscription,
        avatarUrl: req.user.avatarUrl,
      },
    },
  });
};

module.exports = getCurrentUser;
