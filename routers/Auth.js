const express = require("express")
const router = express.Router()
const authController = require("../App/controllers/Auth")
const authRequestValidator = require("../App/helpers/AuthRequestValidator")
const mediaRequestValidator = require("../App/helpers/MediaRequestValidator")
const {body} = require("express-validator")




router.post("/register",
    body("email").isEmail().withMessage(authRequestValidator.REGISTER_VALIDATION_MESSAGES.email.not_valid).bail()
        .custom(authRequestValidator.isInUse).withMessage(authRequestValidator.REGISTER_VALIDATION_MESSAGES.email.in_use),
    body("password").isLength({min:8}).withMessage(authRequestValidator.REGISTER_VALIDATION_MESSAGES.password.min_length),
    authController.register)

router.post("/login", body("email").isEmail().withMessage(authRequestValidator.REGISTER_VALIDATION_MESSAGES.email.not_valid),authController.login)

router.post("/upload/avatar", authController.setAvatar)

router.post(
    "/add/bookmark",
    body("mediaId").notEmpty().withMessage(mediaRequestValidator.MEDIA_VALIDATION_MESSAGES.mediaId.not_valid),
    authController.setMediaAsBookmarked)

module.exports = router