const express = require('express');
const router = express.Router();
const { getGoals, addGoal, updateGoal, deleteGoal } = require('../controllers/goalControllers');
const { protect } = require('../middleware/authMiddleware');

//we can use the same route for different HTTP methods
router.route('/').get(protect, getGoals).post(protect, addGoal);
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

// router.get('/', getGoals);
// router.post('/', addGoal);

// router.put('/:id', updateGoal);
// router.delete('/:id', deleteGoal);

module.exports = router;