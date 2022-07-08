const env = require("../env")
const mongoose = require("mongoose")
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const authRouter = require("../routers/Auth")
const mediaRouter = require("../routers/Media")
mongoose.connect(env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log('Connexion à MongoDB réussie !')).catch(() => console.log('Connexion à MongoDB échouée !'));
app.use(express.json());
app.use(cookieParser());
app.use("/public",express.static("public"))
app.use((req, res, next) => { /*todo : general middleware ; it's applied to every request*/
    env.CLIENT_URL.forEach(url =>{
        if ( url === req.origin) res.setHeader('Access-Control-Allow-Origin', req.origin);
        console.log(req.headers)
    })

    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use("/Api", authRouter)
app.use("/Api", mediaRouter)

module.exports = app