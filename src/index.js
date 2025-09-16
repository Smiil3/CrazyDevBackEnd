const express = require('express')
const app = express()

const bodyParser = require("body-parser");
const verifyToken = require('../src/middleware/authMiddleware');

const v1AuthRouter = require("./v1/routes/authRoutes");

app.use(bodyParser.json());
app.use("/api/v1/auth", v1AuthRouter);



app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})
module.exports = app;