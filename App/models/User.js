const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar: {
        large: {type: String, required: false, default: null},
        medium: {type: String, required: false, default: null},
        small: {type: String, required: false, default: null}
    },
    bookmarks: {type: Array, required: false, default: []}
})

userSchema.plugin(validator)

module.exports = mongoose.model("User", userSchema)