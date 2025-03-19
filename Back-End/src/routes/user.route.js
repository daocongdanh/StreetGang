const express = require("express");
const router = express.Router();
const asyncHandler = require("../middlewares/asyncHandler");
const UserController = require("../controllers/user.controller");

router.post("/register", asyncHandler(UserController.register));
router.post("/login", asyncHandler(UserController.login));
router.post(
  "/add-new-address-by-user",
  asyncHandler(UserController.addNewAddressByMyInfo)
);
router.delete(
  "/delete-address-by-user/:userId/address/:addressId",
  asyncHandler(UserController.deleteAddressByMyInfo)
);
router.put(
  "/update-address-by-user/:addressId",
  asyncHandler(UserController.updateAddressByMyInfo)
);
router.get("/:id", asyncHandler(UserController.getUserById));
router.put("/:id", asyncHandler(UserController.updateUser));

module.exports = router;
