const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the user name"],
    },
    email: String,
    password: String
});


const Users = mongoose.model('users', userSchema);
module.exports = Users