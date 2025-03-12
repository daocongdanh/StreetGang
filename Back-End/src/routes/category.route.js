const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category.controller");
const asyncHandler = require("../middlewares/asyncHandler");

router.get("/", asyncHandler(CategoryController.getAllCategories));
router.get(
  "/with-product-detail",
  asyncHandler(CategoryController.getAllCategoriesWithProduct)
);
router.get("/slug/:slug", asyncHandler(CategoryController.getCategoryBySlug));

router.get("/:id", asyncHandler(CategoryController.getCategoryById));

module.exports = router;
