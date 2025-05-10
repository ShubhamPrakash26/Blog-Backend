const express = require("express");
const router = express.Router();
const { verifyToken, canManageBlog, canSuggest, isAuthor } = require('../middleware/authMiddleware');
const { approveBlog } = require("../controllers/approveBlog");
const { createBlog } = require("../controllers/createBlog");
const { getPendingBlogs } = require("../controllers/getPendingBlogs");
const { getSuggestions } = require("../controllers/getSuggestions");
const { getVerifiedBlogs } = require("../controllers/getVerifiedBlogs");
const { getRejectedBlogs } = require("../controllers/getRejectedBlog");
const { rejectBlog } = require("../controllers/rejectBlog");
const { pendingBlog } = require("../controllers/pendingBlog");
const { getBlogById } = require("../controllers/getBlogById");
const authController = require('../controllers/authController');
const blogController = require('../controllers/blogController');

router.post("/createBlog", verifyToken, createBlog);
router.get("/getPendingBlogs", verifyToken, getPendingBlogs);
router.get("/getSuggestions/:blogId", verifyToken, getSuggestions);
router.get("/getVerifiedBlogs", verifyToken, getVerifiedBlogs);
router.get("/getRejectedBlogs", verifyToken, getRejectedBlogs);
router.post("/rejectBlog", verifyToken, canManageBlog, rejectBlog);
router.post("/pendingBlog", verifyToken, canManageBlog, pendingBlog);
router.post("/approveBlog", verifyToken, canManageBlog, approveBlog);
router.get("/getBlogById/:id", verifyToken, getBlogById);

router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/create', verifyToken, blogController.createBlog);
router.put('/:blogId', verifyToken, isAuthor, blogController.updateBlog);
router.post('/:blogId/manage', verifyToken, canManageBlog, blogController.manageBlog);
router.post('/:blogId/suggest', verifyToken, canSuggest, blogController.addSuggestion);

module.exports = router;