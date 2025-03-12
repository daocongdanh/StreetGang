const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order.controller");
const asyncHandler = require("../middlewares/asyncHandler");

router.post("/", asyncHandler(OrderController.createOrder));
router.get("/vn-pay-callback", asyncHandler(OrderController.vnpayCallBack));
router.get("/user/:userId", asyncHandler(OrderController.getOrderByUser));
router.get("/:id", asyncHandler(OrderController.getOrderById));
module.exports = router;
