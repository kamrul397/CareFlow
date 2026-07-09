// src/app/actions/bookings.js
"use server";

import Booking from "@/models/Booking";
import { connectToDatabase } from "@/lib/mongodb";

export async function updateBookingStatus(bookingId, newStatus) {
  try {
    await connectToDatabase();

    // Find the booking by its ID and update its status field in MongoDB
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: newStatus },
      { new: true },
    );

    if (!updatedBooking) {
      return { success: false, error: "Booking record not found." };
    }

    return { success: true };
  } catch (error) {
    console.error("Database status update error:", error);
    return { success: false, error: "Failed to update database status." };
  }
}
