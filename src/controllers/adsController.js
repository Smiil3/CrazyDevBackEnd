const adsService = require("../services/adsService");
const { verifyToken } = require("../middleware/authMiddleware");
const url = require("url");

const adCreation = async (req, res) => {
  verifyToken(req, res, async () => {});
  const imagePath = req.file.path;
  const { title, description, price, ecoZoneId, roomTypeId } = req.body;
  const userId = req.userId;
  try {
    await adsService.adCreation(
      userId,
      title,
      description,
      price,
      ecoZoneId,
      roomTypeId,
      imagePath,
    );
    res.status(201).json({ message: "Ad created" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getUserAds = async (req, res) => {
  verifyToken(req, res, async () => {});
  const userId = req.params.userId;
  try {
    const ads = await adsService.getUserAds(userId);
    res.status(200).json({ ads });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getAllAds = async (req, res) => {
  const url_parts = url.parse(req.url, true);
  const query = url_parts.query;
  try {
    const ads = query.ecoZoneId
      ? await adsService.getAllAds(query.ecoZoneId)
      : await adsService.getAllAds();
    res.status(200).json({ ads });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getAdById = async (req, res) => {
  try {
    const ads = await adsService.getAdById(req.params.adId);
    res.status(200).json({ ads });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  adCreation,
  getUserAds,
  getAllAds,
  getAdById,
};
