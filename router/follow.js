const express = require("express");
const User = require("../models/userModel");
const verify = require("../middleware/verifyToken");

const router = express.Router();

// Follow/unfollow toggle
router.post("/follow/:id", verify, async (req, res) => {
  try {
    const targetId = req.params.id;
    const myId = req.user.id;

    if (myId.toString() === targetId.toString()) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const me = await User.findById(myId);
    const target = await User.findById(targetId);

    if (!me || !target) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyFollowing = me.following.map(id => id.toString()).includes(targetId.toString());

    if (alreadyFollowing) {
      // UNFOLLOW
      me.following = me.following.filter(id => id.toString() !== targetId.toString());
      target.followers = target.followers.filter(id => id.toString() !== myId.toString());

      await me.save();
      await target.save();

      return res.json({
        success: true,
        following: false,
        followersCount: target.followers.length,
        followingCount: me.following.length
      });
    }

    // FOLLOW
    me.following.push(targetId);
    target.followers.push(myId);

    await me.save();
    await target.save();

    return res.json({
      success: true,
      following: true,
      followersCount: target.followers.length,
      followingCount: me.following.length
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
