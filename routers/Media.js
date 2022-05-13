const express = require("express")
const router = express.Router()
const authMiddleWare = require("../App/middlewares/Auth")
const mediaController = require("../App/controllers/Media")

router.post("/medias/filter", authMiddleWare.isAuthenticated, mediaController.filterMedias)

module.exports = router