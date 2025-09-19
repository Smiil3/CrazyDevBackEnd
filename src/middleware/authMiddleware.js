const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decoded.userId;
    req.role = decoded.role;
    req.username = decoded.name;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token", msg: error });
  }
}

module.exports = {
  verifyToken,
};
