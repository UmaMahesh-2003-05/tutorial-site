const mongoose = require('mongoose');

const TutorialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  tags: [String],
  category: { type: String },
  videos: [
    {
      title: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  games: [
    {
      title: { type: String, required: true },
      iframeUrl: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Tutorial', TutorialSchema);
