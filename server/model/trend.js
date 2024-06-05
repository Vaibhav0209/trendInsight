const mongoose = require("mongoose");

const TrendingTopicSchema = new mongoose.Schema({
  trend1: { type: String, required: true },
  trend2: { type: String, required: true },
  trend3: { type: String, required: true },
  trend4: { type: String, required: true },
  trend5: { type: String, required: true },
  date: { type: String, required: true },
  ipAddress: { type: String, required: true },
});

const TrendingTopic = mongoose.model("TrendingTopic", TrendingTopicSchema);

module.exports = TrendingTopic;
