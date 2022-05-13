const responseUtil = require("../utils/ResponseUtil")
const mediaService = require("../services/Media")

exports.filterMedias = async (request, response) => {
    try{
        const medias = await mediaService.getMedias(request.body.constraints, request.body.userId)
        return response.status(responseUtil.HTTP_OK).json(responseUtil.buildJsonResponse(responseUtil.HTTP_TEXT_MESSAGES.HTTP_OK, null, true, mediaService.buildMediaResources(medias, request.body.userId)))
    }catch (e) {
        return response.status(responseUtil.HTTP_INTERNAL_SERVER_ERROR).json(responseUtil.buildJsonResponse(responseUtil.HTTP_TEXT_MESSAGES.HTTP_INTERNAL_SERVER_ERROR,e.stack,false,null))
    }
}