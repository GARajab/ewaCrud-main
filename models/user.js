import { Schema, mongoose, model } from "mongoose"

const userSchema = new mongoose.Schema({
  cpr: {
    type: String,
    required: true,
    maxlength: [9],
  },
  password: { type: String, required: true },
  email: { type: String, required: true },
})

const User = mongoose.model("User", userSchema)
export default User
