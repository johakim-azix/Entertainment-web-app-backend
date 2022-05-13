const userModel = require('../models/User')
exports.REGISTER_VALIDATION_MESSAGES = {
    "email": {
        "not_valid": "The provided email is not an valid email address",
        "in_use": "This email is already in used !!"
    },
    "password": {
        "min_length": "The password should have At least 8 characters"
    }
}

exports.isInUse = async (email) => {
    const user = await userModel.findOne({email: email}).exec()
    if (user) {
        throw new Error()
    }
}