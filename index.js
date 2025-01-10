// index.js
const app = require('./app');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
🚀 Server is running!
📡 PORT: ${PORT}
🌍 ENV: ${process.env.NODE_ENV || 'development'}
🔗 URL: http://localhost:${PORT}
  `);
});