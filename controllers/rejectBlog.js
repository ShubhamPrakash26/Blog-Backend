const Blog = require("../models/Blog");

exports.rejectBlog = async (req, res) => {
    const { blogId, rejectorName, rejectorRole } = req.body;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.status = 'Rejected';
    blog.rejectedBy = { name: rejectorName, role: rejectorRole };
    await blog.save();
    res.status(200).json({ message: "Blog rejected", blog });
  } catch (error) {
    res.status(500).json({ message: "Error rejecting blog", error });
  }
};