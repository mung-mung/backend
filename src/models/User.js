import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userType: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    id: {type: String, required: true, unique: true},
    pw: {type: String, required: true},
    avataUrl: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
    },
    contact: {type: String, required: true},
    sex: {
      type: String,
      enum: ["male", "female", "prefer not to disclose"],
      required: true,
    },
    birthYear: {type: Number, required: true},
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (this.isModified("pw")) {
    this.pw = await bcrypt.hash(this.pw, 5);
  }
});

userSchema.pre("findOneAndUpdate", async function (next) {
  if (this._update.pw) {
    this._update.pw = await bcrypt.hash(this._update.pw, 5);
  }
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
