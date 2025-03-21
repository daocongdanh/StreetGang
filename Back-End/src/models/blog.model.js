const { model, Schema } = require("mongoose");

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, required: true },
    thumbnail: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], required: true },
  },
  {
    collection: "blogs",
    timestamps: true,
  }
);

const Blog = model("Blog", blogSchema);

module.exports = Blog;
