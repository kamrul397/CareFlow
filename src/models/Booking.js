import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  // Link this booking to a specific user from the users collection
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  serviceId: {
    type: String, // e.g., 'baby-care', 'elder-care'
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  hoursNeeded: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent Mongoose from creating duplicate models upon Hot Reload in development
const Booking =
  mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

export default Booking;
