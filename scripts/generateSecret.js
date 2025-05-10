// scripts/generateSecret.js
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Generate secret
const secret = crypto.randomBytes(64).toString('hex');

// Create or update .env file
const envPath = path.join(__dirname, '..', '.env');
const envContent = `JWT_SECRET=${secret}\nPORT=5000\nMONGODB_URI=mongodb://localhost:27017/fedBlogs\nNODE_ENV=development`;

fs.writeFileSync(envPath, envContent);
console.log('JWT secret generated and saved to .env file');
console.log('Never share or commit your .env file!');