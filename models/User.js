const mongoose = require("mongoose");
const { refreshToken } = require("../controllers/authControllers");
const userSchema = new mongoose.Schema({
    name :String,
    email: {type: String,unique:true},
    password: String,
    refreshToken: String
});

module.exports = mongoose.model("User",userSchema);