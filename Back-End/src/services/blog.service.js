const Blog = require("../models/blog.model");

class BlogService {
  static getBlogs = async () => {
    return await Blog.find().sort({ date: -1 });
  };
}

module.exports = BlogService;
