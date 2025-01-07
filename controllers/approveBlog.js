const Blog = require("../models/Blog");

exports.approveBlog = async (req, res) => {
  const { blogId, approverName, approverRole } = req.body;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.status = 'Approved';
    blog.approvedBy = { name: approverName, role: approverRole };
    await blog.save();

    res.status(200).json({ message: "Blog approved", blog });
  } catch (error) {
    res.status(500).json({ message: "Error approving blog", error });
  }
};
