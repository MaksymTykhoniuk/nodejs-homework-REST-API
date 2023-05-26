const express = require("express");

const { tokenValidation } = require("../../middlewares");

const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", ctrl.signup);
router.post("/login", ctrl.login);
router.get("/current", tokenValidation, ctrl.getCurrentUser);
router.post("/logout", tokenValidation, ctrl.logout);

/*
update subscription "starter", "pro", "business"
*/
router.patch("/", tokenValidation, ctrl.updateSubscription);

module.exports = router;
