const mediaModel = require("../models/Media")

exports.getMedias = async (constraints, userId) => {
    //the bookmarked attr is based on the current user preferences
    let query = mediaModel.find()
    if (constraints.category !== null) query.where("category").equals(constraints.category);
    if (constraints.isTrending) query.where("isTrending").equals(constraints.isTrending);
    if (!constraints.isBookmarked){
        return await query.exec()
    }else {
        let results = []
        const medias = await query.exec()
        if (!medias) return null
        medias.forEach(media => {
            const users = media.users
            if (users.includes(userId)) results.push(media)
        })
        return (results.length === 0)? null : results
    }
}

exports.findMedia = async (mediaId) => {
    return await mediaModel.findOne({_id: mediaId}).exec()
}


exports.buildMediaResources = (medias, usersId) =>{
    if (!medias) return null
    let results = []
    medias.forEach((media, index)=>{
        results.push(buildMediaResource(media, usersId))
    })
    return results
}

buildMediaResource = (media, userId) => {
    return {
        _id: media._id,
        title: media.title,
        category: media.category,
        rating: media.rating,
        year: media.year,
        isTrending: media.isTrending,
        isBookmarked: getBookmarkedStatus(media.users, userId),
        images: media.images
    }
}


getBookmarkedStatus = (mediaUsers, userId) => {
    if (mediaUsers === null || mediaUsers === undefined) return false
    return mediaUsers.includes(userId) === true
}