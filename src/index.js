const express = require('express')
const app = express()

const bodyParser = require("body-parser");
const verifyToken = require('../src/middleware/authMiddleware');

const v1AuthRouter = require("./v1/routes/authRoutes");
const v1AdsRouter = require("./v1/routes/adsRoutes");

app.use(bodyParser.json());
app.use("/api/v1/auth", v1AuthRouter);
app.use("/api/v1/ads", v1AdsRouter);



app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})
module.exports = app;