const Blog = require("../models/Blog");

exports.getVerifiedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'Approved' });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching verified blogs", error });
  }
};
