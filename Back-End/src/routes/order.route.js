const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order.controller");
const asyncHandler = require("../middlewares/asyncHandler");
const delayMiddleware = require("../middlewares/delay");

router.post(
  "/",
  delayMiddleware(500),
  asyncHandler(OrderController.createOrder)
);
router.get("/vn-pay-callback", asyncHandler(OrderController.vnpayCallBack));
router.get("/user/:userId", asyncHandler(OrderController.getOrderByUser));
router.get("/payos-success", asyncHandler(OrderController.payOsSuccess));
router.get("/payos-cancel", asyncHandler(OrderController.payOsCancel));

router.get("/:id", asyncHandler(OrderController.getOrderById));

module.exports = router;
