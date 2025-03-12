const express = require("express");
const router = express.Router();
const asyncHandler = require("../middlewares/asyncHandler");
const ProductController = require("../controllers/product.controller");

router.get("/all", asyncHandler(ProductController.getAllProducts));
router.get("/", asyncHandler(ProductController.filterProduct));
router.get("/new", asyncHandler(ProductController.getAllProductsNew));
router.get("/:id", asyncHandler(ProductController.getProductById));
router.get("/slug/:slug", asyncHandler(ProductController.getProductBySlug));
router.get("/top5/:slug", asyncHandler(ProductController.getTop5Product));
router.post("/", asyncHandler(ProductController.createProduct));
router.delete("/:id/image", asyncHandler(ProductController.deleteImageProduct));
router.put("/:id/image", asyncHandler(ProductController.addImageToProduct));
router.put("/:id", asyncHandler(ProductController.updateProduct));
router.get(
  "/category/:categoryId",
  asyncHandler(ProductController.getProductsByCategory)
);

module.exports = router;
