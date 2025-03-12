const Category = require("../models/category.model");
const Product = require("../models/product.model");
const {
  ResourceNotFoundException,
  ConflictException,
  DeletionException,
} = require("../exceptions/global.exception");
const createSlug = require("../utils/slugUtil");

class CategoryService {
  static getAllCategories = async (req) => {
    const { name } = req.query;
    if (name !== undefined)
      return await Category.find({
        name: { $regex: name, $options: "i" },
      });

    return await Category.find();
  };

  static getCategoryBySlug = async (req) => {
    const { slug } = req.params;
    const category = await Category.findOne({
      slug: slug,
    });

    if (!category)
      throw new ResourceNotFoundException(
        "Không tìm thấy danh mục sản phẩm theo slug: " + slug
      );

    return category;
  };

  static getAllCategoriesWithProduct = async () => {
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "categoryId",
          as: "products",
        },
      },
      {
        $addFields: {
          products: { $slice: ["$products", 10] },
        },
      },
    ]);

    return categories;
  };

  static getCategoryById = async (req) => {
    const { id } = req.params;

    const category = await Category.findOne({
      _id: id,
    });

    if (!category)
      throw new ResourceNotFoundException(
        "Không tìm thấy danh mục sản phẩm theo Id: " + id
      );

    return category;
  };
}

module.exports = CategoryService;
