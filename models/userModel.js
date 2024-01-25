import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: "lastName",
  },
  location: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "project manager", "admin"],
    default: "user",
  },
  verificationToken: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  verified: Date,
  passwordToken: String,

  passwordTokenExpirationDate: Date,
});

// toJSON is just a made up name
UserSchema.methods.toJSON = function () {
  // you want to convert this user to an object then delete the password from the object then return the new object

  var obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
