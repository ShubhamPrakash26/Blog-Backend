exports.getSuggestions = async (req, res) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog.suggestions);  // Changed from blog.comments to blog.suggestions
  } catch (error) {
    res.status(500).json({ message: "Error fetching suggestions", error: error.message });
  }
};