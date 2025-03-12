const express = require("express");
const router = express.Router();
const PaymentMethodController = require("../controllers/paymentMethod.controller");
const asyncHandler = require("../middlewares/asyncHandler");

router.post("/", asyncHandler(PaymentMethodController.createPaymentMethod));
router.get("/", asyncHandler(PaymentMethodController.getAllPaymentMethods));
router.get("/:id", asyncHandler(PaymentMethodController.getPaymentMethodById));
router.put("/:id", asyncHandler(PaymentMethodController.updatePaymentMethod));

module.exports = router;
