const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');

//@desc get all goals
//@route GET /api/goals
//@access private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id });
    res.status(200).json(goals);
});

//@desc add a goal
//@route POST /api/goals
//@access private
const addGoal = asyncHandler(async (req, res) => {
    if (!req.body.title) {
        res.status(400);
        throw new Error('title field is required');
    }
    const goal = await Goal.create({
        title: req.body.title,
        user: req.user.id
    });
    res.status(200).json(goal);
});

//@desc update a goal
//@route PUT /api/goals/:id
//@access private
const updateGoal = asyncHandler(async (req, res) => {
    const id = req.params.id
    const goal = await Goal.findById(id);

    if (!goal) {
        res.status(404);
        throw new Error('Goal not found');
    }

    //check for user
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    //check if goal belongs to user
    if (goal.user.toString() !== user.id) {
        return res.status(401)
        throw new Error('Not authorized');
    }
    const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedGoal);

});

//@desc delete a goal
//@route DELETE /api/goals/:id
//@access private
const deleteGoal = asyncHandler(async (req, res) => {
    const id = req.params.id
    const goal = await Goal.findById(id);
    if (!goal) {
        res.status(404);
        throw new Error('Goal not found');
    }
    //check for user
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    //check if goal belongs to user
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('Not authorized');
    }
    await goal.remove()
    res.status(200).json({ id: id });
});

module.exports = {
    getGoals,
    addGoal,
    updateGoal,
    deleteGoal
};;