const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = new Blog({
      authorId: req.user._id,
      authorName: req.user.name,
      authorDepartment: req.user.department,
      title,
      content
    });
    
    await blog.save();
    res.status(201).json({ message: 'Blog created successfully', blog });
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog', error });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = req.blog;

    blog.title = title;
    blog.content = content;
    blog.updatedAt = Date.now();
    
    await blog.save();
    res.json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog', error });
  }
};

exports.manageBlog = async (req, res) => {
  try {
    const { action, comments } = req.body;
    const blog = req.blog;

    blog.status = action;
    blog.approvalHistory.push({
      action,
      by: {
        userId: req.user._id,
        name: req.user.name,
        role: req.user.role,
        department: req.user.department
      },
      comments
    });

    await blog.save();
    res.json({ message: `Blog ${action.toLowerCase()} successfully`, blog });
  } catch (error) {
    res.status(500).json({ message: 'Error managing blog', error });
  }
};

exports.addSuggestion = async (req, res) => {
  try {
    const { content } = req.body;
    const blog = req.blog;

    blog.suggestions.push({
      userId: req.user._id,
      userName: req.user.name,
      userRole: req.user.role,
      content
    });

    await blog.save();
    res.json({ message: 'Suggestion added successfully', blog });
  } catch (error) {
    res.status(500).json({ message: 'Error adding suggestion', error });
  }
};