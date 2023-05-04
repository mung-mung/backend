import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userType: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  id: {type: String, required: true, unique: true},
  pw: {type: String},
  location: {type: String, required: true},
  ownerDogArray: [{type: mongoose.Schema.Types.ObjectId, ref: "Dog"}],
  walkerIntro: {type: String},
});

userSchema.pre("save", async function () {
  if (this.isModified("pw")) {
    this.pw = await bcrypt.hash(this.pw, 5);
  }
});

const User = mongoose.model("User", userSchema);
export default User;
