import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dogArray: {
    type: [{type: mongoose.Schema.Types.ObjectId, ref: "Dog"}],
    required: true,
    default: [],
  },
  location: {type: [String], required: true, default: []},
});

const Owner = mongoose.model("Owner", ownerSchema);
export default Owner;
