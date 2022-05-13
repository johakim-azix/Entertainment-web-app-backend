exports.HTTP_OK = 200
exports.HTTP_CREATED = 201
exports.HTTP_ACCEPTED = 202
exports.HTTP_NO_CONTENT = 204
exports.HTTP_RESET_CONTENT = 205
exports.HTTP_BAD_REQUEST = 400
exports.HTTP_UNAUTHORIZED = 401
exports.HTTP_FORBIDDEN = 403
exports.HTTP_NOT_FOUND = 404
exports.HTTP_NOT_ALLOWED = 405
exports.HTTP_TIME_OUT = 408
exports.HTTP_INTERNAL_SERVER_ERROR = 500
exports.HTTP_NOT_IMPLEMENTED = 501
exports.HTTP_TEXT_MESSAGES = {
        HTTP_OK : "Ok",
        HTTP_CREATED : "The resource has been created",
        HTTP_ACCEPTED : "Accepted",
        HTTP_NO_CONTENT : "No content has been found",
        HTTP_RESET_CONTENT : "Content reset",
        HTTP_BAD_REQUEST : "The given data was invalid",
        HTTP_UNAUTHORIZED : "unauthorized",
        HTTP_FORBIDDEN : "This action is forbidden",
        HTTP_NOT_FOUND : "Not found ",
        HTTP_NOT_ALLOWED : "Your are not allowed to perform this action",
        HTTP_INTERNAL_SERVER_ERROR : "Internal server error",
        HTTP_NOT_IMPLEMENTED : "Not implemented",
    }

exports.buildJsonResponse = (message,issues, success, data) =>{
    return {
        message: message,
        issues : issues,
        success: success,
        data: data
    }
}