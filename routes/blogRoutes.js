const express = require("express");
const router = express.Router();
const createBlog = require("../controllers/createBlog");
const getPendingBlogs = require("../controllers/getPendingBlogs");
const getSuggestions = require("../controllers/getSuggestions");
const getVerifiedBlogs = require("../controllers/getVerifiedBlogs");
const rejectedBlog = require("../controllers/getRejectedBlog");
const approveBlog = require("../controllers/approveBlog");
const getBlogById = require("../controllers/getBlogById");

router.post("/createBlog", createBlog.createBlog);
router.get("/getPendingBlogs", getPendingBlogs.getPendingBlogs);
router.get("/getSuggestions/:blogId", getSuggestions.getSuggestions);
router.get("/getVerifiedBlogs", getVerifiedBlogs.getVerifiedBlogs);
router.get("/getRejectedBlogs", rejectedBlog.getRejectedBlogs);
router.post("/rejectBlog", rejectedBlog.rejectBlog);
router.post("/approveBlog", approveBlog.approveBlog);
router.get("/getBlogById/:id", getBlogById.getBlogById);  // Add this line

module.exports = router;