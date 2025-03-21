const express = require("express");
const router = express.Router();
const asyncHandler = require("../middlewares/asyncHandler");
const delayMiddleware = require("../middlewares/delay");
const UserController = require("../controllers/user.controller");

router.post(
  "/register",
  delayMiddleware(500),
  asyncHandler(UserController.register)
);
router.post("/login", delayMiddleware(500), asyncHandler(UserController.login));
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
router.put(
  "/:id",
  delayMiddleware(500),
  asyncHandler(UserController.updateUser)
);

module.exports = router;
