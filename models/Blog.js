const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  reviewerName: String,
  reviewerRole: String,
  comment: String,
  date: { type: Date, default: Date.now },
});

const blogSchema = new mongoose.Schema({
  authorName: { type: String, required: true },
  authorDepartment: { type: String, required: true },
  blogImage: { type: String },
  blogHeading: { type: String, required: true },
  blogContent: { type: String, required: true },
  dateOfPosting: { type: Date, default: Date.now },
  comments: [commentSchema], 
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  approvedBy: {
    name: String,
    role: String,
  },
  publicReaction: {
    likes: { type: Number, default: 0 },
    comments: [{ type: String }],
    impressions: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model('Blog', blogSchema);
