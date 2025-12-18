const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    console.log("----- VERIFY DEBUG -----");
    console.log("AUTH HEADER =", authHeader);

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // declare token BEFORE using
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing after Bearer" });
    }

    // verify token
    const verified = jwt.verify(token, "jdsbfiuwhfiuwhfwuif");

    req.user = verified; // contains id, email, role
    next();

  } catch (err) {
     console.error("VERIFY ERROR:", err);
     return res.status(400).json({ message: "Invalid token" });
  }
};
