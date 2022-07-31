var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
    username: {
        type: String,
        required: "Username is required",
        length: 5
    },
    email: {
        type: String,
        required: "Email address is required",
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email not valid']
    },
    phone: {
        type: Number,
        required: "Phone number is required"
    },
    password: {
        type: String,
        required: "Password is required",
        minlength: 6,
    }
})

module.exports = mongoose.model('User', userSchema)