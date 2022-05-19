const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const sessionSchema = mongoose.Schema({
    userId: {type: String, required: true, unique: true},
    refreshToken: {type:String, required: true, unique: true}
})
sessionSchema.plugin(uniqueValidator)
module.exports = mongoose.model("session", sessionSchema)