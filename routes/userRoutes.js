const express = require('express');
const router = express.Router();

// We'll add user routes later
router.get('/', (req, res) => {
  res.json({ message: 'User routes working' });
});

module.exports = router;