const mongoose = require("mongoose");

const UserLogin = new mongoose.Schema({
    Username: String,
    Password: String
},
    { versionKey: false }
)
module.exports = mongoose.model('login', UserLogin)