const Blog = require("../models/Blog");

// Function to get rejected blogs
exports.getRejectedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'Rejected' });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rejected blogs", error });
  }
};