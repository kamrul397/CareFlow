"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getUserBookings } from "@/app/actions/fetchBookings";

const serviceNames = {
  "baby-care": "Baby Care & Babysitting",
  "elderly-service": "Elderly Support Care",
  "sick-people-service": "Sick People Service",
};

export default function MyBookingsPage() {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    async function loadData() {
      if (!currentUser?.id && !currentUser?._id) {
        setLoading(false);
        return;
      }
      const activeId = currentUser.id || currentUser._id;
      const response = await getUserBookings(activeId);
      if (response.success) {
        setBookings(response.data);
      }
      setLoading(false);
    }
    loadData();
  }, [currentUser]);

  const handleCancelBooking = (bookingId) => {
    const confirmation = window.confirm(
      "Are you sure you want to cancel this care booking request?",
    );
    if (confirmation) {
      setBookings((prevBookings) =>
        prevBookings.map((b) =>
          b.id === bookingId ? { ...b, status: "Cancelled" } : b,
        ),
      );
    }
  };

  // QUICK SIMULATOR: Cycle through states to easily test "Pending" -> "Confirmed" -> "Completed"
  const handleSimulateStatus = (bookingId, currentStatus) => {
    let nextStatus = "Pending";
    if (currentStatus === "Pending") nextStatus = "Confirmed";
    else if (currentStatus === "Confirmed") nextStatus = "Completed";
    else if (currentStatus === "Completed") nextStatus = "Pending";

    setBookings((prevBookings) =>
      prevBookings.map((b) =>
        b.id === bookingId ? { ...b, status: nextStatus } : b,
      ),
    );
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-24 text-center text-sm text-gray-500">
        Loading your care bookings ledger...
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-24 text-center">
        <p className="text-gray-500 text-lg mb-4">
          ⚠️ Please log in to view your bookings.
        </p>
        <Link
          href="/login"
          className="bg-blue-600 text-white text-sm font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Log In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">My Bookings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track your requested care services and status changes.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center bg-white border p-12 rounded-2xl">
          <p className="text-gray-500 text-lg">
            You have no active bookings scheduled.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block bg-blue-600 text-white text-sm font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Book a Service
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl border shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Booking ID</th>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Total Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-gray-400">
                    {booking.id.slice(-6).toUpperCase()}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {serviceNames[booking.serviceId] || booking.serviceId}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {booking.hoursNeeded} Hours
                  </td>
                  <td className="px-6 py-4 text-gray-500 max-w-xs truncate">
                    {booking.locationRaw}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    ৳{booking.totalPrice}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusBadgeClass(booking.status)}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                    {/* Simulator Button */}
                    <button
                      onClick={() =>
                        handleSimulateStatus(booking.id, booking.status)
                      }
                      className="text-xs font-semibold bg-blue-50 text-blue-600 px-2.5 py-1.5 rounded-md hover:bg-blue-100 transition"
                      title="Click to test status changes!"
                    >
                      🔄 Test Status
                    </button>

                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="text-xs font-semibold bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-200 transition"
                    >
                      View
                    </button>

                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      disabled={
                        booking.status === "Cancelled" ||
                        booking.status === "Completed"
                      }
                      className="text-xs font-semibold bg-red-50 text-red-600 px-3 py-1.5 rounded-md hover:bg-red-100 transition disabled:opacity-30 disabled:pointer-events-none"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* DETAIL VIEW MODAL */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 border shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Booking Parameters
            </h3>
            <div className="space-y-3 border-t border-b py-4 text-sm text-gray-600">
              <p>
                <span className="font-bold text-gray-900">ID:</span>{" "}
                <span className="font-mono text-xs">{selectedBooking.id}</span>
              </p>
              <p>
                <span className="font-bold text-gray-900">Service:</span>{" "}
                {serviceNames[selectedBooking.serviceId] ||
                  selectedBooking.serviceId}
              </p>
              <p>
                <span className="font-bold text-gray-900">Duration:</span>{" "}
                {selectedBooking.hoursNeeded} Hours
              </p>
              <p>
                <span className="font-bold text-gray-900">Total Price:</span> ৳
                {selectedBooking.totalPrice}
              </p>
              <p>
                <span className="font-bold text-gray-900">Status: </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getStatusBadgeClass(selectedBooking.status)}`}
                >
                  {selectedBooking.status}
                </span>
              </p>
              <div className="pt-2">
                <p className="font-bold text-gray-900 mb-1">Destination:</p>
                <p className="bg-gray-50 p-2.5 rounded-lg border text-xs leading-relaxed">
                  {selectedBooking.locationRaw}
                </p>
              </div>
            </div>
            <div className="mt-5 text-right">
              <button
                onClick={() => setSelectedBooking(null)}
                className="bg-blue-600 text-white font-bold text-xs px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
