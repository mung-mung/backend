import mongoose from "mongoose";

const dogSchema = new mongoose.Schema({
  ownerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dogName: {type: String, required: true},
  birthday: {type: String, required: true},
  breed: {type: String, required: true},
  weight: {type: Number, required: true},
});

const Dog = mongoose.model("Dog", dogSchema);
export default Dog;
