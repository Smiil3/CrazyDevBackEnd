const request = require("supertest");
const app = require("../../../src");
const User = require("../../../src/models/User");
const bcrypt = require("bcrypt");

describe("User Conneciton", () => {
  it("should connect the user", async () => {
    //GIVEN
    const password = "test";
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      nom: "User",
      prenom: "Test",
      email: "test@gmail.com",
      telephone: "0753904652",
      password_hash: hashedPassword,
    });
    //WHEN
    const response = await request(app)
      .post("/api/v1/auth/login")
      .set("content-type", "application/json")
      .send({
        email: "test@gmail.com",
        password: "test",
      });
    //THEN
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});
