const User = require("../models/userModel");
const router = require("./user");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

router.post("/login", async (req, res) => {
  try {
    const { email, passWord } = req.body;

    if (!email || !passWord) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Account not found" });
    }

    const validPass = await bcrypt.compare(passWord, user.passWord);
    if (!validPass) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // ✅ FIXED TOKEN
    const token = jwt.sign(
      {
        id: user._id,            // <-- THIS WAS MISSING
        email: user.email,
        role: user.role,
        username: user.userName,
      },
      "jdsbfiuwhfiuwhfwuif",
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      token,
      data: {
        _id: user._id,
        email: user.email,
        userName: user.userName,
        role: user.role,
      },
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;