const responseUtil = require("../utils/ResponseUtil")
const {validationResult} = require("express-validator")
const userService = require('../services/User')
const mediaService = require("../services/Media")
exports.register = async (request, response) => {
    try {
        const errors = validationResult(request)
        if (!errors.isEmpty()) return response.status(responseUtil.HTTP_BAD_REQUEST).json(responseUtil.buildJsonResponse(responseUtil.HTTP_TEXT_MESSAGES[responseUtil.HTTP_BAD_REQUEST], errors.array(), false, null));
        await userService.createUser(request.body)
        return response.status(responseUtil.HTTP_CREATED).json(responseUtil.buildJsonResponse(responseUtil.HTTP_TEXT_MESSAGES.HTTP_CREATED, null, true, null));
    } catch (e) {
        return response.status(responseUtil.HTTP_INTERNAL_SERVER_ERROR).json(responseUtil.buildJsonResponse(responseUtil.HTTP_TEXT_MESSAGES.HTTP_INTERNAL_SERVER_ERROR, e.stack, false, null))
    }
}

exports.login = async (request, response) => {
    try {
        const user = await userService.findUserByEmail(request.body.email);
        if (!user) return response.status(responseUtil.HTTP_BAD_REQUEST).json(responseUtil.buildJsonResponse(responseUtil.HTTP_TEXT_MESSAGES.HTTP_BAD_REQUEST, null, false, null))
        if (!await userService.comparePassword(request.body.password, user.password)) return response.status(responseUtil.HTTP_UNAUTHORIZED).json(responseUtil.buildJsonResponse(responseUtil.HTTP_TEXT_MESSAGES.HTTP_UNAUTHORIZED, null, false, null))
        return response.status(responseUtil.HTTP_OK).json(responseUtil.buildJsonResponse(responseUtil.HTTP_TEXT_MESSAGES.HTTP_OK, null, true, userService.buildUserResource(user)));
    } catch (e) {
        return response.status(responseUtil.HTTP_INTERNAL_SERVER_ERROR).json(responseUtil.buildJsonResponse(responseUtil.HTTP_TEXT_MESSAGES.HTTP_INTERNAL_SERVER_ERROR, e.stack, false, null))
    }
}

exports.setAvatar = async (request, response) => {
    //todo client side will treat(resize them accordingly) images before sending them to the server so here no additional treatment will be donne
    await response.json("ici")
}

exports.setMediaAsBookmarked = async (request, response) => {
    try {
        let media = await mediaService.findMedia(request.body.mediaId)
        if (!media) await response.status(responseUtil.HTTP_NOT_ALLOWED).json(responseUtil.buildJsonResponse(responseUtil.HTTP_TEXT_MESSAGES.HTTP_BAD_REQUEST, responseUtil.HTTP_TEXT_MESSAGES.HTTP_NO_CONTENT, false, null));
        media = await userService.addBookmark(request.body.mediaId, request.body.userId)
        console.log(media)
        await response.status(responseUtil.HTTP_OK).json(responseUtil.buildJsonResponse(responseUtil.HTTP_TEXT_MESSAGES.HTTP_OK, null, true, mediaService.buildMediaResources([media], request.body.userId)))
    } catch (e) {
        return response.status(responseUtil.HTTP_INTERNAL_SERVER_ERROR).json(responseUtil.buildJsonResponse(responseUtil.HTTP_TEXT_MESSAGES.HTTP_BAD_REQUEST, e.message, false, null))
    }
}