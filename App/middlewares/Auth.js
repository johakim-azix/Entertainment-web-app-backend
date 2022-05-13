const jwt = require("jsonwebtoken")
const responseUtil = require("../utils/ResponseUtil")

exports.isAuthenticated = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(" ")[1]
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET")
        if (request.body.userId && request.body.userId !== decodedToken.userId) {
            throw new Error(responseUtil.HTTP_TEXT_MESSAGES.HTTP_UNAUTHORIZED)
        } else {
            next()
        }
    } catch (e) {
        return response.status(responseUtil.HTTP_INTERNAL_SERVER_ERROR).json(responseUtil.buildJsonResponse(responseUtil.HTTP_TEXT_MESSAGES.HTTP_INTERNAL_SERVER_ERROR, e.message, false, null))
    }
}