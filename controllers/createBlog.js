const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
  try {
    const { 
      authorName, 
      authorDepartment, 
      blogImage, 
      blogHeading, 
      blogContent 
    } = req.body;

    // Validation
    if (!authorName || !authorDepartment || !blogHeading || !blogContent) {
      return res.status(400).json({ 
        message: "Please provide all required fields" 
      });
    }

    const newBlog = new Blog({
      authorName,
      authorDepartment,
      blogImage,
      blogHeading,
      blogContent,
      status: 'Pending', // All new blogs start as pending
      dateOfPosting: new Date(),
      publicReaction: {
        likes: 0,
        comments: [],
        impressions: 0
      }
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