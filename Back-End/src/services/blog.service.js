const Blog = require("../models/blog.model");

class BlogService {
  static getBlogs = async (req) => {
    var totalItem = (await Blog.find()).length;

    const limit = 2;

    var page = parseInt(req.query.page || 0);
    page = page > 0 ? page - 1 : page;

    const totalPage = Math.ceil(totalItem / limit);
    const skipCount = page * limit;

    const blogs = await Blog.find().skip(skipCount).limit(limit);
    const data = {
      page: page + 1,
      limit: limit,
      totalPage: totalPage,
      totalItem: totalItem,
      result: blogs,
    };
    return data;
  };
}

module.exports = BlogService;
