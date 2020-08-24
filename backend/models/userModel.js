import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, require: true },
  admin: { type: Boolean, required: true, default: false }
});

const userModel = mongoose.model("User", userSchema);

export default userModel;