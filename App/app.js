const env = require("../env.configs")
const mongoose = require("mongoose")
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const authRouter = require("../routers/Auth")
const mediaRouter = require("../routers/Media")
mongoose.connect(env.configs.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log('Connexion à MongoDB réussie !')).catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());
app.use(cookieParser());
app.use("/public",express.static("public"))
app.use((req, res, next) => { /*todo : general middleware ; it's applied to every request*/
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use("/Api", authRouter)
app.use("/Api", mediaRouter)

module.exports = app