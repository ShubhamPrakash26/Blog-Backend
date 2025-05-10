const Blog = require('../models/Blog');
exports.createBlog = async (req, res) => {
  try {
    const { 
      title,
      content,
      tags,
      visibility 
    } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({ 
        message: "Please provide all required fields" 
      });
    }

    const newBlog = new Blog({
      authorId: req.user._id,
      authorName: req.user.name,
      authorDepartment: req.user.department,
      authorRole: req.user.role,
      title,
      content,
      tags: tags || [],
      visibility: visibility || 'Internal',
      status: 'Draft',
      version: 1
    });

    await newBlog.save();
    res.status(201).json({ 
      message: "Blog created successfully", 
      blog: newBlog 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error creating blog", 
      error: error.message 
    });
  }
};
