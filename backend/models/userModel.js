import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNo: {
    type: String,
    required: true,
    unique: true,
    },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  refreshToken: String,
  verificationToken: String,
  verificationTokenExpiry: Date,

},
{timestamps: true}
);

const User = mongoose.model("User", userSchema);

export default User;
