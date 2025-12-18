const express = require("express");
const Upload = require("../models/uploadModel");
const verify = require("../middleware/verifyToken"); 

const like = express.Router();

like.post("/like/:id", verify, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Upload.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Clean array (remove nulls)
    post.likedBy = post.likedBy.filter(u => u !== null);

    const alreadyLiked = post.likedBy.includes(userId);

    if (alreadyLiked) {
      // UNLIKE
      post.likeCount = Math.max(0, post.likeCount - 1);
      post.likedBy = post.likedBy.filter((u) => u.toString() !== userId);
      await post.save();

      return res.json({
  success: true,
  isLiked: false,
  likeCount: post.likeCount
});

    }

    // LIKE
    post.likeCount += 1;
    post.likedBy.push(userId);
    await post.save();

   return res.json({
  success: true,
  isLiked: true,
  likeCount: post.likeCount
});


  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = like;
