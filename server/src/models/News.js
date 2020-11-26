const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  provider:{
  type: String,
  },
  category: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  publishedAt: {
    type: Date,
  },
  imageUrl: {
    type: String,
  },
  sourceUrl: {
    type: String,
  },
});

exports.News = new mongoose.model("news", newsSchema);
