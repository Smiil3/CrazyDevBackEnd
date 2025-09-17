const Ad = require('../models/Ad');

const adCreation = async(userId, title, description, price, ecoZoneId, roomTypeId) => {
    try {
        await Ad.create({
            host_id: userId,
            titre: title,
            description: description,
            prix_par_nuit: price,
            ecozone_id: ecoZoneId,
            type_id: roomTypeId,
            is_active: true,
    })
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
};

const getUserAds = async(userId) => {
    try {
        return await Ad.findByUserId(userId);
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
};

const getAllAds = async(ecoZoneId=0) => {
    try {
        return ecoZoneId !== 0 ? Ad.findByEcoZoneId(ecoZoneId) :await Ad.list();
    }
    catch (error) {
        throw { status: 500, message: error?.message || error };
    }
};

const getAdById = async (adId) => {
    try {
        return await Ad.findByIdAndUser(adId);
    }
    catch (error) {
        throw { status: 500, message: error?.message || error };
    }
}

module.exports = {
    adCreation,
    getUserAds,
    getAllAds,
    getAdById
};