import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    nid: {
      type: String,
      required: [true, "NID number is required"],
      unique: true, // Prevents two accounts from using the same NID card number
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true, // Prevents duplicate email accounts
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    contact: {
      type: String,
      required: [true, "Contact number is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user", // Defaults to standard customer profile permissions
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` date tags to entries
  },
);

// CRITICAL FOR NEXT.JS: Check if the model is already compiled into memory.
// If it is, reuse it. If it isn't, compile it fresh.
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
