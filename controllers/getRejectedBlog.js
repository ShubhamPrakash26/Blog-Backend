const Blog = require("../models/Blog");

// Function to reject a blog
exports.rejectBlog = async (req, res) => {
  const { blogId } = req.body;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.status = 'Rejected';
    await blog.save();
    res.status(200).json({ message: "Blog rejected", blog });
  } catch (error) {
    res.status(500).json({ message: "Error rejecting blog", error });
  }
};

// Function to get rejected blogs
exports.getRejectedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'Rejected' });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rejected blogs", error });
  }
};