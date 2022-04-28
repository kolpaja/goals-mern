const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getME } = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getME)

module.exports = router;