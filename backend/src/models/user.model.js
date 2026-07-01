import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please provide your full name"],
    trim: true //Auto remove any whitespace from the beginning and end of the string
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minlength: 6,
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

},
{
  timestamps: true,
}

);

const User = mongoose.model("User",userSchema)


export default User;