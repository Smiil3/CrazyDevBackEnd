const request = require("supertest");
const app = require("../../../src");
const bcrypt = require("bcrypt");
const Ad = require("../../../src/models/Ad");
const User = require("../../../src/models/User");

describe("Get Ads", () => {
    const password = "test"
    it("should return 2 ads", async () => {
        //GIVEN
        await createUserAndAds(await bcrypt.hash(password, 10));
        //WHEN
        const response = await request(app).get("/api/v1/ads/all");
        //THEN
        expect(response.status).toBe(200);
        expect(response.body.ads).toHaveLength(2);
        expect(response.body.ads[0]).toMatchObject({
            id: 1,
            titre: "Test Ad1",
            description: "This is a test ad",
            prix_par_nuit: "100",
            ecozone_id: 2,
            type_id: 1,
            host_id: 1,
            is_active: true,
        });
    });
    it("should return 1 ad for ecozone 2", async () => {
        //GIVEN
        await createUserAndAds(await bcrypt.hash(password, 10));
        //WHEN
        const response = await request(app).get("/api/v1/ads/all?ecoZoneId=2");
        //THEN
        expect(response.status).toBe(200);
        expect(response.body.ads).toHaveLength(1);
        expect(response.body.ads[0]).toMatchObject({
            id: 1,
            titre: "Test Ad1",
            description: "This is a test ad",
            prix_par_nuit: "100",
            ecozone_id: 2,
            type_id: 1,
            host_id: 1,
            is_active: true,
        });
    })
    async function createUserAndAds(hashedPassword) {
        const user = await User.create({
            nom: "User",
            prenom: "Test",
            email: "test@gmail.com",
            telephone: "0753904652",
            password_hash: hashedPassword,
        });
        await Ad.create({
            titre: "Test Ad1",
            description: "This is a test ad",
            prix_par_nuit: 100,
            ecozone_id: 2,
            type_id: 1,
            host_id: user.id,
            is_active: true,
        });
        await Ad.create({
            titre: "Test Ad2",
            description: "This is a test ad",
            prix_par_nuit: 100,
            ecozone_id: 1,
            type_id: 1,
            host_id: user.id,
            is_active: true,
        });
        return user;
    }
});