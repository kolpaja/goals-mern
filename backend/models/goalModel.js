const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
    }
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);