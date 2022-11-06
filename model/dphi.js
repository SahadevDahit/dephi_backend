const mongoose = require("mongoose");
const challenges = new mongoose.Schema({
  challengeName: {
    type: String,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  description: {
    type: String,
  },
  levelType: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
  avatar: {
    type: String,
  }
});

module.exports = mongoose.model("DPhi", challenges);