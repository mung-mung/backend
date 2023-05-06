import mongoose from "mongoose";

const walkerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  intro: {
    type: Object,
    default: {
      greeting: {type: String, default: ""},
      appeal: {type: String, default: ""},
      availableTime: {type: String, default: ""},
    },
    required: true,
  },
  location: {type: [String], required: true, default: []},
});

const Walker = mongoose.model("Walker", walkerSchema);
export default Walker;
