const express = require("express");
const router = express.Router();
const asyncHandler = require("../middlewares/asyncHandler");
const BlogControlller = require("../controllers/blog.controller");

router.get("/", asyncHandler(BlogControlller.getBlogs));

module.exports = router;
