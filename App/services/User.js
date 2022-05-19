const bcrypt = require('bcrypt')
const userModel = require('../models/User')
const mediaModel = require('../models/Media')
const sessionModel = require("../models/session")
const jwt = require("jsonwebtoken")

exports.createUser = async (requestBody) => {
    const hash = await bcrypt.hash(requestBody.password, 10)
    const user = new userModel({email: requestBody.email, password: hash})
    await user.save()
}

exports.findUserByEmail = async (email) => {
    return await userModel.findOne({email: email}).exec()
}

exports.comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash)
}

exports.buildAuthUserResource = async (user) => {
    const userResource = {
        id: user._id,
        avatar: user.avatar,
        email: user.email,
        tokenType: "Bearer",
        accessToken: jwt.sign(
            {userId: user._id},
            "RANDOM_TOKEN_SECRET",
            {expiresIn: "1h"}
        ),
        refreshToken: jwt.sign(
            {
                id: user._id,
                email: user.email,
            },
            "RANDOM_TOKEN_SECRET"
        )
    }
    let lastSession = await sessionModel.where("userId").equals(userResource.id).exec()
    if (lastSession.length !== 0) {
        console.log(lastSession)
        await sessionModel.updateOne({userId: userResource.id}, {refreshToken: userResource.refreshToken})
    } else {
        let session = new sessionModel({
            userId: userResource.id,
            refreshToken: userResource.refreshToken
        })
        await session.save()
    }
    return userResource
}

exports.buildUserResource = (user) => {
    return {
        id: user._id,
        avatar: user.avatar,
        email: user.email,
    }
}

exports.addBookmark = async (mediaId, userId) => {
    let mediaIds = (await userModel.findById(userId).exec()).bookmarks;
    let userIds = (await mediaModel.findById(mediaId).exec()).users
    if (mediaIds.includes(mediaId)) {
        mediaIds.forEach((media, index) => {
            if (media === mediaId) mediaIds.splice(index, 1)
        })
    } else {
        mediaIds.push(mediaId)
    }

    if (userIds.includes(userId)) {
        userIds.forEach((user, index) => {
            if (user === userId) userIds.splice(index, 1)
        })
    } else {
        userIds.push(userId)
    }
    await userModel.updateOne({_id: userId}, {bookmarks: mediaIds}).exec()
    await mediaModel.updateOne({_id: mediaId}, {users: userIds}).exec()
    return await mediaModel.findById(mediaId).exec()
}

// exports.setAvatar = async (profilesPath, userId) => {
//     const imgUrls = {
//         large: profilesPath + userId + "_large.jpeg",
//         medium: profilesPath + userId + "_medium.jpeg",
//         small: profilesPath + userId + "_small.jpeg"
//     }
//     await userModel.where({_id: userId}).update({avatar: imgUrls}).exec()
//     return this.buildUserResource(await userModel.findById(userId).exec())
// }

exports.setBase64Avatar = async (base64Large, base64Medium, base64Small, userId) => {
    const base64Encoding = {
        large: base64Large,
        medium: base64Medium,
        small: base64Small,
    }
    await userModel.where({_id: userId}).update({avatar: base64Encoding}).exec()
    return this.buildUserResource(await userModel.findById(userId).exec())
}

exports.validateRefreshToken = async (refreshToken) => {
    const session = await sessionModel.where("refreshToken").equals(refreshToken).exec()
    if (session.length === 0) throw new Error("no session found")
    const user = await userModel.findById(jwt.decode(refreshToken).id)
    if (!user) throw new Error("The targeted user don't")
    return  await this.buildAuthUserResource(user)
}

exports.clearRefreshToken = async (refreshToken)=>{
   await sessionModel.findOneAndDelete({refreshToken:refreshToken})
}