const mongoose = require('mongoose');

const RegisteredUserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model('RegisteredUser', RegisteredUserSchema);