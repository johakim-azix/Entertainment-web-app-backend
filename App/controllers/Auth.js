const responseUtil = require("../utils/ResponseUtil")
const {validationResult} = require("express-validator")
const userService = require('../services/User')
const mediaService = require("../services/Media")
const fs = require("fs")
const env = require("../env")


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
        const userResource = await userService.buildAuthUserResource(user)
        return response
            .cookie("refresh_token",
                userResource.refreshToken,
                {
                    secure: true,
                    httpOnly: true,
                    domain:env.CLIENT_URL
                })
            .status(responseUtil.HTTP_OK)
            .json(responseUtil.buildJsonResponse(responseUtil.HTTP_TEXT_MESSAGES.HTTP_OK, null, true, userResource));
    } catch (e) {
        return response.status(responseUtil.HTTP_INTERNAL_SERVER_ERROR).json(responseUtil.buildJsonResponse(responseUtil.HTTP_TEXT_MESSAGES.HTTP_INTERNAL_SERVER_ERROR, e.stack, false, null))
    }
}

exports.logout = async (request, response) => {
    try {
        const refreshToken = request.headers.cookie.split("refresh_token=")[1]
        await userService.clearRefreshToken(refreshToken)
        return response.clearCookie().status(responseUtil.HTTP_OK).json(responseUtil.buildJsonResponse(responseUtil.HTTP_TEXT_MESSAGES.HTTP_OK, null, true, null))
    } catch (e) {
        return response.status(responseUtil.HTTP_INTERNAL_SERVER_ERROR).json(responseUtil.buildJsonResponse(responseUtil.HTTP_TEXT_MESSAGES.HTTP_INTERNAL_SERVER_ERROR, e.message, false, null))
    }
}

exports.setMediaAsBookmarked = async (request, response) => {
    try {
        let media = await mediaService.findMedia(request.body.mediaId)
        if (!media) await response.status(responseUtil.HTTP_NOT_ALLOWED).json(responseUtil.buildJsonResponse(responseUtil.HTTP_TEXT_MESSAGES.HTTP_BAD_REQUEST, responseUtil.HTTP_TEXT_MESSAGES.HTTP_NO_CONTENT, false, null));
        media = await userService.addBookmark(request.body.mediaId, request.body.userId)
        await response.status(responseUtil.HTTP_OK).json(responseUtil.buildJsonResponse(responseUtil.HTTP_TEXT_MESSAGES.HTTP_OK, null, true, mediaService.buildMediaResources([media], request.body.userId)))
    } catch (e) {
        return response.status(responseUtil.HTTP_INTERNAL_SERVER_ERROR).json(responseUtil.buildJsonResponse(responseUtil.HTTP_TEXT_MESSAGES.HTTP_BAD_REQUEST, e.message, false, null))
    }
}

exports.setAvatar = async (request, response) => {
    try {
        let userResource = await userService.setBase64Avatar(request.body.avatarLarge, request.body.avatarMedium, request.body.avatarSmall, request.body.userId)
        return response.status(responseUtil.HTTP_OK).json(responseUtil.buildJsonResponse(responseUtil.HTTP_TEXT_MESSAGES.HTTP_OK, null, true, userResource))
    } catch (e) {
        return response.status(responseUtil.HTTP_INTERNAL_SERVER_ERROR).json(responseUtil.buildJsonResponse(responseUtil.HTTP_TEXT_MESSAGES.HTTP_INTERNAL_SERVER_ERROR, e.message, false, null))
    }
}

exports.refreshToken = async (request, response) => {
    try {
        const refreshToken = request.headers.cookie.split("refresh_token=")[1]
        const userResource = await userService.validateRefreshToken(refreshToken)
        return response
            .cookie("refresh_token",
                userResource.refreshToken,
                {
                    secure: true,
                    httpOnly: true
                })
            .status(responseUtil.HTTP_OK)
            .json(responseUtil.buildJsonResponse(responseUtil.HTTP_TEXT_MESSAGES.HTTP_OK, null, true, userResource))
    } catch (e) {
        return response.status(responseUtil.HTTP_INTERNAL_SERVER_ERROR).json(responseUtil.buildJsonResponse(responseUtil.HTTP_TEXT_MESSAGES.HTTP_INTERNAL_SERVER_ERROR, e.message, false, null))
    }
}

exports.saveImg = (base64Img, userId) => {
    let regex = /^data:.+\/(.+);base64,(.*)$/;
    let matches = base64Img.match(regex);
    let ext = matches[1];
    let data = matches[2];
    let avatarLargeBuffer = Buffer.from(data, 'base64');
    fs.writeFileSync('public/profiles/' + userId + "." + ext, avatarLargeBuffer);
}
