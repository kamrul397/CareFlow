// src/app/actions/bookings.js
"use server";

import Booking from "@/models/Booking";
import { connectToDatabase } from "@/lib/mongodb";

/**
 * 1. CREATE A NEW BOOKING
 */
export async function createNewBooking(bookingData) {
  try {
    await connectToDatabase();

    const { userId, serviceId, hoursNeeded, location, totalPrice } =
      bookingData;

    const newBooking = new Booking({
      userId,
      serviceId,
      hoursNeeded: Number(hoursNeeded),
      location,
      totalPrice: Number(totalPrice),
      status: "Pending",
    });

    await newBooking.save();
    console.log(`✨ New Booking Saved for Service: ${serviceId}`);

    return { success: true, bookingId: newBooking._id.toString() };
  } catch (error) {
    console.error("Database saving error:", error);
    return { success: false, error: "Failed to save booking to database." };
  }
}

/**
 * 2. UPDATE AN EXISTING BOOKING STATUS
 */
export async function updateBookingStatus(bookingId, newStatus) {
  try {
    await connectToDatabase();

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

/**
 * 3. FETCH ALL BOOKINGS FOR A USER
 */
export async function getUserBookings(userId) {
  try {
    await connectToDatabase();

    const liveBookings = await Booking.find({ userId }).sort({ createdAt: -1 });

    return {
      success: true,
      data: liveBookings.map((b) => ({
        id: b._id.toString(),
        serviceId: b.serviceId,
        hoursNeeded: b.hoursNeeded,
        totalPrice: b.totalPrice,
        status: b.status || "Pending",
        locationRaw: b.location,
        createdAt: b.createdAt ? b.createdAt.toISOString() : null,
      })),
    };
  } catch (error) {
    console.error("Error retrieving user database bookings:", error);
    return { success: false, data: [], error: "Could not read records." };
  }
}
