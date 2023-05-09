import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    greeting: {
      type: String,
      default: "",
    },
    availableTime: {
      type: [[[String]]],
      default: [[[]]],
      required: true,
    },
    dogArray: {
      type: [{type: mongoose.Schema.Types.ObjectId, ref: "Dog"}],
      required: true,
      default: [],
    },
    location: {type: [String], required: true, default: []},
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Owner = mongoose.model("Owner", ownerSchema);
export default Owner;
