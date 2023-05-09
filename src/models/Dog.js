import mongoose from "mongoose";

const dogSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dogName: {type: String, required: true},
    birthYearMonth: {type: String, required: true},
    breed: {type: String, required: true},
    weight: {type: Number, required: true},
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Dog = mongoose.model("Dog", dogSchema);
export default Dog;
