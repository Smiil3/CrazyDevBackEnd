const Ad = require("../models/Ad");

const adCreation = async (
  userId,
  title,
  description,
  price,
  ecoZoneId,
  roomTypeId,
  imagePath,
) => {
  try {
    await Ad.create({
      host_id: userId,
      titre: title,
      description: description,
      prix_par_nuit: Number(price),
      ecozone_id: Number(ecoZoneId),
      type_id: Number(roomTypeId),
      imagePath: imagePath,
      is_active: true,
    });
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const getUserAds = async (userId) => {
  try {
    const ads = await Ad.findByUserId(userId);
    return ads.map((ad) => ({
      id: ad.id,
      title: ad.titre,
      description: ad.description,
      pricePerNight: ad.prix_par_nuit,
      ecoZoneId: ad.ecozone_id,
      roomTypeId: ad.type_id,
      createdAt: ad.created_at,
      imageUrl: ad.imagePath ? `http://localhost:3000/${ad.imagePath}` : null,
    }));
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const getAllAds = async (ecoZoneId = 0) => {
  try {
    const ads =
      ecoZoneId !== 0 ? await Ad.findByEcoZoneId(ecoZoneId) : await Ad.list();
    return ads.map((ad) => ({
      id: ad.id,
      title: ad.titre,
      description: ad.description,
      pricePerNight: ad.prix_par_nuit,
      ecoZoneId: ad.ecozone_id,
      roomTypeId: ad.type_id,
      createdAt: ad.created_at,
      imageUrl: ad.imagePath ? `http://localhost:3000/${ad.imagePath}` : null,
    }));
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const getAdById = async (adId) => {
  try {
    const ad = await Ad.findByIdAndUser(adId);
    return {
      id: ad.id,
      title: ad.titre,
      description: ad.description,
      pricePerNight: ad.prix_par_nuit,
      ecoZoneId: ad.ecozone_id,
      roomTypeId: ad.type_id,
      imageUrl: ad.imagePath ? `http://localhost:3000/${ad.imagePath}` : "",
      host: {
        firstName: ad.hosts.prenom,
        lastName: ad.hosts.nom,
      },
    };
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  adCreation,
  getUserAds,
  getAllAds,
  getAdById,
};
