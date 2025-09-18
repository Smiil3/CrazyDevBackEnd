const request = require("supertest");
const app = require("../../../src");
const bcrypt = require("bcrypt");
const Ad = require("../../../src/models/Ad");
const User = require("../../../src/models/User");

describe("Get Ad by id", () => {
    const password = "test"
    it("should return 1 ad", async () => {
        //GIVEN
        const {user, ad, ad2} = await createUserAndAds(await bcrypt.hash(password, 10));
        //WHEN
        const response = await request(app).get(`/api/v1/ads/${ad.id}`);
        //THEN
        expect(response.status).toBe(200);
        expect(response.body.ads).toMatchObject({
            id: 1,
            titre: "Test Ad1",
            description: "This is a test ad",
            prix_par_nuit: "100",
            ecozone_id: 2,
            type_id: 1,
            hosts: {
                prenom: user.prenom,
                nom: user.nom,
            }
        });
    });
    async function createUserAndAds(hashedPassword) {
        const user = await User.create({
            nom: "User",
            prenom: "Test",
            email: "test@gmail.com",
            telephone: "0753904652",
            password_hash: hashedPassword,
        });
        const ad = await Ad.create({
            titre: "Test Ad1",
            description: "This is a test ad",
            prix_par_nuit: 100,
            ecozone_id: 2,
            type_id: 1,
            host_id: user.id,
            is_active: true,
        });
        const ad2 = await Ad.create({
            titre: "Test Ad2",
            description: "This is a test ad",
            prix_par_nuit: 100,
            ecozone_id: 1,
            type_id: 1,
            host_id: user.id,
            is_active: true,
        });
        return {user, ad, ad2};
    }
});