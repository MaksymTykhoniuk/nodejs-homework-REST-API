const express = require("express");

const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

const { isValidId, tokenValidation } = require("../../middlewares");

router.get("/", tokenValidation, ctrl.getAll);

router.get("/:contactId", tokenValidation, isValidId, ctrl.getById);

router.post("/", tokenValidation, ctrl.createNew);

router.delete("/:contactId", tokenValidation, isValidId, ctrl.deleteById);

router.put("/:contactId", tokenValidation, isValidId, ctrl.editById);

router.patch(
  "/:contactId/favorite",
  tokenValidation,
  isValidId,
  ctrl.updateStatusContact
);

module.exports = router;
