const Blog = require("../models/Blog");

exports.pendingBlog = async (req, res) => {
    const { blogId, Name, Role } = req.body;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.status = 'Rejected';
    blog.rejectedBy = { name: Name, role: Role };
    await blog.save();
    res.status(200).json({ message: "Blog status updated to Pending", blog });
  } catch (error) {
    res.status(500).json({ message: "Error updating blog status to Pending", error });
  }
};