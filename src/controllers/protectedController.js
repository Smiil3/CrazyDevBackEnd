const protectedService = require("../services/protectedService");

const tokenCheck = async (req, res) => {
  const tokenCheck = protectedService.tokenCheck();
  if (req.role == "admin") {
    res.status(200).json({
      message: `Protected route accessed. Your role is ${req.role}`,
      tokenCheck,
    });
  } else {
    res.status(500).send({ status: "FAILED", data: { error: "Acces denied" } });
  }
};

module.exports = {
  tokenCheck,
};
