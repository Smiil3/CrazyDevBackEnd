const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const userRegistration = async (
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
) => {
  try {
    const userExisted = await User.findByEmail(email);
    if (userExisted) {
      throw {
        status: 400,
        message:
          "If an account already exists for this email, try signing in or resetting your password.",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      nom: lastName,
      prenom: firstName,
      email: email,
      telephone: phoneNumber,
      password_hash: hashedPassword,
    });
    const userAfterCreate = await User.findByEmail(email);
    return jwt.sign(
      {
        userId: userAfterCreate.id,
        name: userAfterCreate.nom,
        role: "default",
      },
      process.env.JWT_KEY,
      {
        expiresIn: "60m",
      },
    );
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const userConnection = async (email, password) => {
  try {
    const user = await User.findByEmail(email);
    if (!user) {
      throw {
        status: 401,
        error: "Authentication failed, user does not exist!",
      };
    }
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      throw { status: 401, error: "Authentication failed, wrong password!" };
    }
    return jwt.sign(
      { userId: user.id, name: user.nom, role: "default" },
      process.env.JWT_KEY,
      {
        expiresIn: "60m",
      },
    );
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  userRegistration,
  userConnection,
};
