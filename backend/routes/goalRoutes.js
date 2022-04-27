const express = require('express');
const router = express.Router();
const { getGoals, addGoal, updateGoal, deleteGoal } = require('../controllers/goalControllers');

//we can use the same route for different HTTP methods
router.route('/').get(getGoals).post(addGoal);
router.route('/:id').put(updateGoal).delete(deleteGoal);

// router.get('/', getGoals);
// router.post('/', addGoal);

// router.put('/:id', updateGoal);
// router.delete('/:id', deleteGoal);

module.exports = router;