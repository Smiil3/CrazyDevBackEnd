const request = require("supertest");
const app = require("../../../src");
const bcrypt = require("bcrypt");
const Ad = require("../../../src/models/Ad");
const User = require("../../../src/models/User");

describe("Ad Creation", () => {
    const password = "test"
    it("should create one ad", async () => {
        //GIVEN
        const user = await createUser(await bcrypt.hash(password, 10));
        const loginResponse = await request(app)
            .post("/api/v1/auth/login")
            .set("content-type", "application/json")
            .send({
                email: user.email,
                password: password
            });
        const token = loginResponse.body.token;
        //WHEN
        const response = await request(app)
            .post("/api/v1/ads/create")
            .set({ Authorization: token })
            .set("content-type", "application/json")
            .send({
                title: "Test",
                description: "Un test.",
                price: 100,
                ecoZoneId: 2,
                roomTypeId: 1
            });
        //THEN
        expect(response.status).toBe(201);
        const ads = await Ad.findByUserId(user.id);
        expect({
            ...ads[0],
            prix_par_nuit: ads[0].prix_par_nuit.toString()
        }).toMatchObject({
            id: 1,
            titre: "Test",
            description: "Un test.",
            prix_par_nuit: "100",
            ecozone_id: 2,
            type_id: 1,
            host_id: 1,
            is_active: true,
        });
    });
    async function createUser(hashedPassword) {
        return user = await User.create({
            nom: "User",
            prenom: "Test",
            email: "test@gmail.com",
            telephone: "0753904652",
            password_hash: hashedPassword,
        });
    }
});