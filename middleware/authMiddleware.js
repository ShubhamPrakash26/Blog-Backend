const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Blog = require('../models/Blog');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const canManageBlog = async (req, res, next) => {
  try {
    const { role, department } = req.user;
    const blogId = req.params.blogId || req.body.blogId;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const isGlobalManager = ['President', 'Vice President'].includes(role);
    const isDepartmentManager = ['Director', 'Deputy Director'].includes(role) && 
                              department === blog.authorDepartment;

    if (!isGlobalManager && !isDepartmentManager) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    req.blog = blog;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error checking permissions', error });
  }
};

const canSuggest = async (req, res, next) => {
  try {
    const { role, department } = req.user;
    const blogId = req.params.blogId || req.body.blogId;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const validRoles = ['Senior Executive', 'Director', 'Deputy Director', 'President', 'Vice President'];
    const hasDepartmentAuthority = department === blog.authorDepartment || ['President', 'Vice President'].includes(role);

    if (!validRoles.includes(role) || !hasDepartmentAuthority) {
      return res.status(403).json({ message: 'Cannot make suggestions' });
    }

    req.blog = blog;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error checking permissions', error });
  }
};

const isAuthor = async (req, res, next) => {
  try {
    const blogId = req.params.blogId || req.body.blogId;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.authorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only the author can modify this blog' });
    }

    req.blog = blog;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error checking author', error });
  }
};

module.exports = { verifyToken, canManageBlog, canSuggest, isAuthor };