const mongoose = require('mongoose');

// Schema for comments/suggestions from reviewers
const suggestionSchema = new mongoose.Schema({
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviewerName: {
    type: String,
    required: true
  },
  reviewerRole: {
    type: String,
    required: true,
    enum: ['Senior Executive', 'Director', 'Deputy Director', 'President', 'Vice President']
  },
  reviewerDepartment: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Pending', 'Implemented', 'Declined'],
    default: 'Pending'
  }
});

// Schema for tracking blog approval history
const approvalHistorySchema = new mongoose.Schema({
  action: {
    type: String,
    enum: ['Approved', 'Rejected', 'Changes Requested'],
    required: true
  },
  actionBy: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    }
  },
  reason: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Main Blog Schema
const blogSchema = new mongoose.Schema({
  // Author Information
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  authorDepartment: {
    type: String,
    required: true
  },
  authorRole: {
    type: String,
    required: true
  },

  // Blog Content
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 200
  },
  content: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  featuredImage: {
    type: String,
    default: null
  },

  // Blog Status and Metadata
  status: {
    type: String,
    enum: ['Draft', 'Pending', 'Changes Requested', 'Approved', 'Rejected', 'Published'],
    default: 'Draft'
  },
  visibility: {
    type: String,
    enum: ['Public', 'Internal', 'Department'],
    default: 'Internal'
  },
  publishedAt: {
    type: Date,
    default: null
  },

  // Version Control
  version: {
    type: Number,
    default: 1
  },
  lastEditedAt: {
    type: Date,
    default: Date.now
  },

  // Review and Approval
  suggestions: [suggestionSchema],
  approvalHistory: [approvalHistorySchema],
  currentApprover: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },

  // Engagement Metrics
  metrics: {
    views: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },
    shares: {
      type: Number,
      default: 0
    }
  },

  // Public Comments (if enabled)
  comments: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    userName: String,
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Indexes for improved query performance
blogSchema.index({ authorId: 1, status: 1 });
blogSchema.index({ authorDepartment: 1, status: 1 });
blogSchema.index({ status: 1, publishedAt: -1 });
blogSchema.index({ tags: 1 });

// Pre-save hook to update lastEditedAt
blogSchema.pre('save', function(next) {
  if (this.isModified('content') || this.isModified('title')) {
    this.lastEditedAt = new Date();
  }
  next();
});

// Methods
blogSchema.methods.isEditable = function(userId) {
  return this.authorId.toString() === userId.toString() && 
         !['Published', 'Approved'].includes(this.status);
};

blogSchema.methods.canApprove = function(user) {
  const isGlobalManager = ['President', 'Vice President'].includes(user.role);
  const isDepartmentManager = ['Director', 'Deputy Director'].includes(user.role) && 
                            user.department === this.authorDepartment;
  return isGlobalManager || isDepartmentManager;
};

blogSchema.methods.canSuggest = function(user) {
  const validRoles = ['Senior Executive', 'Director', 'Deputy Director', 'President', 'Vice President'];
  return validRoles.includes(user.role) && 
         (user.department === this.authorDepartment || 
          ['President', 'Vice President'].includes(user.role));
};

// Virtual for formatted creation date
blogSchema.virtual('formattedCreatedAt').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;