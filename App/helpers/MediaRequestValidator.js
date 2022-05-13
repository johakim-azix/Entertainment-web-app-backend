const mediaModel = require("../models/Media")
exports.MEDIA_VALIDATION_MESSAGES = {
    mediaId :{
        not_valid: "The mediaId can't be empty or null",
        not_exist:"There is no media for the given id"
    }
}

exports.mediaExist = async (mediaId) =>{
    /*todo : implement it as middleware */
}