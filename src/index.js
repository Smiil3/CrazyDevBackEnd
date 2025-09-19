const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const bodyParser = require("body-parser");

const v1AuthRouter = require("./v1/routes/authRoutes");
const v1AdsRouter = require("./v1/routes/adsRoutes");

app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/v1/auth", v1AuthRouter);
app.use("/api/v1/ads", v1AdsRouter);

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`API on :${port}`));
}
module.exports = app;
