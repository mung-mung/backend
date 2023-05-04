import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  walkerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dog",
    required: true,
  },
});

const Match = mongoose.model("Match", matchSchema);
export default Match;
