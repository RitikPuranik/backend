const express = require("express");
const Upload = require("../models/uploadModel");
const auth = require("../middleware/auth"); // only if using auth
const router = express.Router();

// Only logged-in users can upload
router.post("/upload", auth, async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: "Image URL is required" });
    }

    const saved = await Upload.create({
      imageUrl,
      username: req.user.username  // from JWT
    });

    res.json({
      success: true,
      message: "Image uploaded successfully",
      data: saved
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/uploaded", async (req, res) => {
  try {
    const list = await Upload.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;   // VERY IMPORTANT
