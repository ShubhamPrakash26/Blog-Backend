const Blog = require("../models/Blog");

exports.getPendingBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'Pending' });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pending blogs", error });
  }
};
