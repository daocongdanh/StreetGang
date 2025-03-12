const express = require("express");
const router = express.Router();
const asyncHandler = require("../middlewares/asyncHandler");
const ReviewController = require("../controllers/review.controller");

router.post("/", asyncHandler(ReviewController.createReview));
router.get(
  "/product/:productId",
  asyncHandler(ReviewController.getReviewsByProduct)
);
router.get("/", asyncHandler(ReviewController.getAllReviews));
router.put(
  "/:id/status/:status",
  asyncHandler(ReviewController.updateReviewStatus)
);

module.exports = router;
