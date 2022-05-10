import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  registerDate: { type: Date, default: Date.now },
});

const User = model("User", userSchema);

export default User;
