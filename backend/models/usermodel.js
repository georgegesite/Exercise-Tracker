const { Schema } = require("mongoose");
const mongoose = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength:  3, //atleast 3 characters long
    },
},
{
    timestamps: true, // timestapms to when created and modified
});

const User = mongoose.model('User',userSchema);
module.exports = User;