const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
    }
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);