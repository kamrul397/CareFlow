// src/app/actions/fetchBookings.js
"use server";

import Booking from "@/models/Booking";
import { connectToDatabase } from "@/lib/mongodb";

export async function getUserBookings(userId) {
  try {
    await connectToDatabase();

    // Fetch bookings matching this specific user ID from MongoDB
    const liveBookings = await Booking.find({ userId }).sort({ createdAt: -1 });

    // Sanitize MongoDB objects into clean plain JavaScript arrays for Next.js Client Components
    return {
      success: true,
      data: liveBookings.map((b) => ({
        id: b._id.toString(),
        serviceId: b.serviceId,
        hoursNeeded: b.hoursNeeded,
        totalPrice: b.totalPrice,
        status: b.status || "Pending", // Fallback to 'Pending' if not structured yet
        locationRaw: b.location,
        createdAt: b.createdAt ? b.createdAt.toISOString() : null,
      })),
    };
  } catch (error) {
    console.error("Error retrieving user database bookings:", error);
    return { success: false, data: [], error: "Could not read records." };
  }
}
