const mongoose = require("mongoose")
const express = require('express')
const app = express()
const authRouter = require("../routers/Auth")
const mediaRouter = require("../routers/Media")
const mediaSeeder = require('../seeders/Media')
const url = "mongodb://localhost/test_men_stack"
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log('Connexion à MongoDB réussie !')).catch(() => console.log('Connexion à MongoDB échouée !'));
mediaSeeder.populateMediaCollection(mediaSeeder.jsonMedias).then(()=> console.info("Media collection were populated successfully")).catch(error => console.error(error))
app.use(express.json());
app.use("/public",express.static("public"))
app.use((req, res, next) => { /*todo : general middleware ; it's applied to every request*/
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use("/Api", authRouter)
app.use("/Api", mediaRouter)

module.exports = app