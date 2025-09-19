const express = require("express");
const protectedController = require("../../controllers/protectedController");
const router = express.Router();

router.get("/tokenCheck", protectedController.tokenCheck);

module.exports = router;
