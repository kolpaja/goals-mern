const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getME } = require('../controllers/userControllers');

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', getME)

module.exports = router;