const mongoose = require("mongoose");

const tutorialSchema = mongoose.Schema({
  video_name: { type: String, required: true },
  video_description: { type: String, required: true },
  duration: { type: Number, required: true },
  category: { type: String, required: true },
  // images: [{ type: String, required: true }],
  video_url: { type: String, required: true },
  published_at: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model("Tutorials", tutorialSchema);
