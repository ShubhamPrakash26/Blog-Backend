# Blog Management System

A comprehensive **Blog Management System** built using **Node.js**, **Express.js**, and **MongoDB**. This system provides a platform for users to manage blogs with features such as user authentication, role-based access control, CRUD operations for blog posts, commenting, and blog approval or rejection workflows.

---

## 📋 Features
- **User Management**:
  - User registration and login with secure authentication.
  - Role-based access control for authors, reviewers, and admins.
- **Blog Post Management**:
  - Create, edit, update, and delete blog posts.
  - Approval or rejection of blog posts by reviewers or admins.
- **Commenting System**:
  - Add comments on blog posts.
- **Database**:
  - MongoDB is used for efficient storage and retrieval of data.

---

## 🛠️ Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **ORM**: Mongoose
- **Middleware**: Custom middleware for authentication and error handling

---

## 🔧 Requirements
- **Node.js** (version 14 or higher)
- **MongoDB** (version 4 or higher)
- **Express.js** (version 4 or higher)
- **Mongoose** (version 5 or higher)

---

## 🚀 Installation and Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/blog-management-system.git
   cd blog-management-system
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and configure the following variables:
   ```
   PORT=5000
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   ```

4. **Start the server**:
   ```bash
   node app.js
   ```

5. **Access the application**:
   Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

---

## 📚 API Endpoints

### **Authentication**
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in an existing user.

### **Blogs**
- `POST /api/blogs/create`: Create a new blog post.
- `GET /api/blogs/:id`: Retrieve a blog post by ID.
- `PUT /api/blogs/:id/update`: Update a blog post.
- `DELETE /api/blogs/:id/delete`: Delete a blog post.
- `POST /api/blogs/approve`: Approve a blog post.
- `POST /api/blogs/reject`: Reject a blog post.

### **Comments**
- `POST /api/comments/create`: Add a new comment to a blog post.

---

## 🗂️ Project Structure
```
blog-management-system/
├── controllers/
│   ├── authController.js    # Handles user registration and login
│   ├── blogController.js    # Handles blog operations (CRUD)
│   └── commentController.js # Handles commenting on blog posts
├── middleware/
│   ├── authMiddleware.js    # Authenticates and authorizes user requests
│   └── errorHandler.js      # Handles errors and sends error responses
├── models/
│   ├── User.js              # User model
│   ├── Blog.js              # Blog post model
│   └── Comment.js           # Comment model
├── routes/
│   ├── authRoutes.js        # Routes for authentication
│   ├── blogRoutes.js        # Routes for blog management
│   └── commentRoutes.js     # Routes for comments
├── app.js                   # Entry point for the application
└── package.json             # Project metadata and dependencies
```

---

## 🛡️ Middleware
- **authMiddleware**: Authenticates and authorizes user requests based on roles.
- **errorHandler**: Captures and handles errors, sending appropriate error responses.

---

## 🗃️ Database Models

### User
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "string" // 'author', 'reviewer', or 'admin'
}
```

### Blog
```json
{
  "title": "string",
  "content": "string",
  "author": "ObjectId", // Reference to User
  "status": "string", // 'pending', 'approved', or 'rejected'
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Comment
```json
{
  "blogId": "ObjectId", // Reference to Blog
  "author": "ObjectId", // Reference to User
  "content": "string",
  "createdAt": "Date"
}
```

---

## 🔒 License
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

---

## 🤝 Contributions
Contributions are welcome! Feel free to fork the repository and submit a pull request.

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Submit a pull request.

---

## 📞 Contact
For any questions or feedback, feel free to contact:
- **Email**: [your-email@example.com](mailto:your-email@example.com)
- **GitHub**: [your-username](https://github.com/your-username)
