const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart.controller");
const delayMiddleware = require("../middlewares/delay");
const asyncHandler = require("../middlewares/asyncHandler");

router.post("/", delayMiddleware(300), asyncHandler(CartController.addToCart));
router.get("/user/:userId", asyncHandler(CartController.getCartByUser));
router.put("/cart-item/:productId", asyncHandler(CartController.updateCart));
router.delete(
  "/cart-item/:userId/:productId",
  asyncHandler(CartController.deleteCart)
);

module.exports = router;
