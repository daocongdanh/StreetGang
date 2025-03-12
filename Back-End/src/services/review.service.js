const Product = require("../models/product.model");
const User = require("../models/user.model");
const Review = require("../models/review.model");

const { ResourceNotFoundException } = require("../exceptions/global.exception");

class ReviewService {
  static createReview = async (req) => {
    const { rating, comment, productId, images, userId } = req.body;

    const product = await Product.findOne({
      _id: productId,
    });
    if (!product) throw new ResourceNotFoundException("Không tìm sản phẩm");

    const user = await User.findOne({
      _id: userId,
    });
    if (!user) throw new ResourceNotFoundException("Không tìm user");

    const review = new Review({
      user: userId,
      product: productId,
      rating: rating,
      comment: comment,
      images: images,
      reviewDate: Date.now(),
      status: true,
    });

    return await review.save();
  };

  static getReviewsByProduct = async (req) => {
    const { productId } = req.params;
    const { sort, limit } = req.query;

    const product = await Product.findOne({
      _id: productId,
    });
    if (!product) throw new ResourceNotFoundException("Không tìm sản phẩm");

    const arr = sort.split(":");
    const key = arr[0];
    const value = parseInt(arr[1]);

    const reviews = await Review.find({
      product: productId,
    })
      .sort({
        [key]: value,
      })
      .limit(parseInt(limit))
      .populate("user");

    const reviewData = await Review.find({
      product: productId,
    });

    const sum = reviewData.reduce((total, item) => total + item.rating, 0);
    const avgRate = Math.ceil(sum / reviewData.length);

    return {
      array: reviews,
      totalItem: reviewData.length,
      avgRate: avgRate,
    };
  };

  static getAllReviews = async () => {
    return await Review.find()
      .populate("user", "fullName")
      .populate("product", "name");
  };

  static updateReviewStatus = async (req) => {
    const { id, status } = req.params;

    const review = await Review.findOne({
      _id: id,
    });

    if (!review) {
      throw new ResourceNotFoundException("Không tìm thấy review");
    }

    review.status = status;

    return await review.save();
  };
}

module.exports = ReviewService;
