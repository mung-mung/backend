import mongoose from "mongoose";

const walkerSchema = new mongoose.Schema(
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
    appeal: {
      type: String,
      default: "",
    },
    location: {type: [String], default: [], required: true},
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Walker = mongoose.model("Walker", walkerSchema);
export default Walker;
