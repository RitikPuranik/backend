const express = require("express");
const Comment = require("../models/commentModel");
const Upload = require("../models/uploadModel");
const auth = require("../middleware/auth");

const router = express.Router();

/**
 * Add comment or reply
 */
router.post("/:postId", auth, async (req, res) => {
  try {
    const { text, parentCommentId } = req.body;

    if (!text) return res.status(400).json({ message: "Comment required" });

    const comment = await Comment.create({
      postId: req.params.postId,
      userId: req.user.id,
      username: req.user.username,
      text,
      parentCommentId: parentCommentId || null
    });

    await Upload.findByIdAndUpdate(req.params.postId, {
      $inc: { commentsCount: 1 }
    });

    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Get comments for a post
 */
router.get("/:postId", async (req, res) => {
  const comments = await Comment.find({ postId: req.params.postId })
    .sort({ createdAt: 1 });

  res.json(comments);
});

module.exports = router;
