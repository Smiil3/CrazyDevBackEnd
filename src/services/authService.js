const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const userRegistration = async(firstName, lastName, email, phoneNumber, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
         User.create({
            nom: lastName,
            prenom: firstName,
            email: email,
            telephone: phoneNumber,
            //password: hashedPassword,
        })

        const userExisted = User.findByEmail(email);
        return jwt.sign({userId: userExisted.id, name: userExisted.nom, role: "default"}, 'fc/6^?"E*sJ:n=vDuQ!z', {
            expiresIn: '60m',
        })
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
};

const userConnection = async (email, password) => {
    try {
        const user = User.findByEmail({ email });
        if (!user) {
            throw {status : 401, error: 'Authentication failed, user does not exist!' };
        }
        // const passwordMatch = await bcrypt.compare(password, user.password);
        // if (!passwordMatch) {
        //     throw { status : 401, error: 'Authentication failed, wrong password!' };
        // }
        return jwt.sign({userId: user.id, name: user.nom, role: "default"}, 'fc/6^?"E*sJ:n=vDuQ!z', {
                expiresIn: '60m',
            }
        )
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
};

module.exports = {
    userRegistration,
    userConnection,
};