const mongoose = require('mongoose');

const blacklists = new mongoose.Schema({
    user: String,
    reason: String,
});

module.exports = mongoose.model('blacklists', blacklists);