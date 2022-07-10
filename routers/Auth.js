const express = require("express")
const router = express.Router()
const authController = require("../App/controllers/Auth")
const authRequestValidator = require("../App/helpers/AuthRequestValidator")
const mediaRequestValidator = require("../App/helpers/MediaRequestValidator")
const authMiddleWare = require("../App/middlewares/Auth")
const {body} = require("express-validator")

router.post(
    "/register",
    body("email")
        .isEmail().withMessage(authRequestValidator.REGISTER_VALIDATION_MESSAGES.email.not_valid).bail()
        .custom(authRequestValidator.isInUse).withMessage(authRequestValidator.REGISTER_VALIDATION_MESSAGES.email.in_use),
    body("password")
        .isLength({min:8}).withMessage(authRequestValidator.REGISTER_VALIDATION_MESSAGES.password.min_length),
    authController.register
)

router.post(
    "/login",
    body("email").isEmail().withMessage(authRequestValidator.REGISTER_VALIDATION_MESSAGES.email.not_valid),
    authController.login
)

router.get(
    "/user",
    authMiddleWare.isAuthenticated,
    authController.getUser
)

router.post(
    "/upload/avatar",
    authMiddleWare.isAuthenticated,
    authController.setAvatar
)

router.post(
    "/add/bookmark",
    authMiddleWare.isAuthenticated,
    body("mediaId").notEmpty().withMessage(mediaRequestValidator.MEDIA_VALIDATION_MESSAGES.mediaId.not_valid),
    authController.setMediaAsBookmarked
)
// router.get(
//     "/logout",
//     authMiddleWare.isAuthenticated,
//     authController.logout
// )

module.exports = router