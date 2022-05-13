const mongoose = require("mongoose")
const validator = require("mongoose-unique-validator")

const mediaSchema = mongoose.Schema({
    title: {type: String, required: true, unique: true},
    category: {type: String, required: true},
    rating: {type: String, required: true},
    year: {type: Number, required: true},
    isTrending: {type: Boolean, required: true, default: false},
    images: {
        trending: {
            small: {type: String, required: false, default: null},
            large: {type: String, required: false, default: null},
        },
        regular: {
            small: {type: String, required: true},
            medium: {type: String, required: true},
            large: {type: String, required: true},
        }
    },
    users: {type: Array, required: false, default: []}
})

mediaSchema.plugin(validator)
module.exports = mongoose.model("Media", mediaSchema)