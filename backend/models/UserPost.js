const mongoose = require('mongoose');

const UserPostSchema = new mongoose.Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    likes: { type: Number, default: 0 },
    likedby: { type: Array, default: [] }
});

module.exports = mongoose.model('UserPost', UserPostSchema);