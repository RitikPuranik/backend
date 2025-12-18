const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  likeCount: {
    type: Number,
    default: 0
  },
  likedBy: {
    type: [String],
    default: []
  },
  username: { 
    type: String, 
    required: false 
  },
  commentsCount: {
    type: Number,
    default: 0
  }

});

module.exports = mongoose.model("Upload", uploadSchema);

