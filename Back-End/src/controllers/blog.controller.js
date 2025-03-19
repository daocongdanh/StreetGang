const ResponseSuccess = require("../responses/success.response");
const BlogService = require("../services/blog.service");
const StatusCode = require("../utils/httpStatusCode");

class BlogController {
  static getBlogs = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Lấy bài viết thành công",
      await BlogService.getBlogs()
    ).send(res);
  }
}

module.exports = BlogController;
