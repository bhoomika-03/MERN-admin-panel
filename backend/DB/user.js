const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:Number,
    userId:Number
});

module.exports= new mongoose.model('users',userSchema);