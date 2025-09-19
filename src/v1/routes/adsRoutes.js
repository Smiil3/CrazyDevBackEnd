const express = require("express");
const adsController = require("../../controllers/adsController");
const router = express.Router();
const validator = require("express-joi-validation").createValidator({});
const {
  adCreationSchema,
  getUserAdsSchema,
  getAdsSchema,
  adDetailsSchema,
} = require("./validators");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post(
  "/create",
  validator.body(adCreationSchema),
  upload.single("image"),
  adsController.adCreation,
);
router.get(
  "/user/:userId/",
  validator.params(getUserAdsSchema),
  adsController.getUserAds,
);
router.get("/all", validator.query(getAdsSchema), adsController.getAllAds);
router.get(
  "/:adId",
  validator.params(adDetailsSchema),
  adsController.getAdById,
);

module.exports = router;
