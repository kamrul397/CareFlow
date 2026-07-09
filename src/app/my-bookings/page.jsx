"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getUserBookings } from "@/app/actions/fetchBookings";
import { updateBookingStatus } from "@/app/actions/bookings";

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
  const [actionLoadingId, setActionLoadingId] = useState(null);

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

  useEffect(() => {
    loadData();
  }, [currentUser]);

  const handleModifyStatus = async (bookingId, nextStatus) => {
    setActionLoadingId(bookingId);
    const response = await updateBookingStatus(bookingId, nextStatus);
    if (response.success) {
      setBookings((prevBookings) =>
        prevBookings.map((b) =>
          b.id === bookingId ? { ...b, status: nextStatus } : b,
        ),
      );
    } else {
      alert(response.error || "Failed to update status.");
    }
    setActionLoadingId(null);
  };

  const handleCancelBooking = (bookingId) => {
    const confirmation = window.confirm(
      "Are you sure you want to cancel this care booking request?",
    );
    if (confirmation) {
      handleModifyStatus(bookingId, "Cancelled");
    }
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
    <div className="max-w-6xl mx-auto px-4 py-12 w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">My Bookings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track your requested care services and live database status updates.
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
        <div>
          {/* ==================== 1. DESKTOP VIEW (TABLE MODE) ==================== */}
          <div className="hidden md:block w-full overflow-hidden bg-white rounded-2xl border shadow-sm">
            <table className="w-full text-left border-collapse table-fixed">
              <thead>
                <tr className="bg-gray-50 border-b text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="px-4 py-4 w-20">ID</th>
                  <th className="px-4 py-4 w-40">Service</th>
                  <th className="px-4 py-4 w-20">Hours</th>
                  <th className="px-4 py-4 w-44">Location</th>
                  <th className="px-4 py-4 w-24">Price</th>
                  <th className="px-4 py-4 w-28">Status</th>
                  <th className="px-4 py-4 w-32 text-center">Simulator</th>
                  <th className="px-4 py-4 w-32 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
                {bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-gray-50/50 transition"
                  >
                    <td className="px-4 py-4 font-mono text-xs font-bold text-gray-400 truncate">
                      {booking.id.slice(-4).toUpperCase()}
                    </td>
                    <td className="px-4 py-4 font-semibold text-gray-900 truncate">
                      {serviceNames[booking.serviceId] || booking.serviceId}
                    </td>
                    <td className="px-4 py-4 text-gray-600 truncate">
                      {booking.hoursNeeded}h
                    </td>
                    <td
                      className="px-4 py-4 text-gray-500 truncate"
                      title={booking.locationRaw}
                    >
                      {booking.locationRaw}
                    </td>
                    <td className="px-4 py-4 font-bold text-gray-900 truncate">
                      ৳{booking.totalPrice}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadgeClass(booking.status)}`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    <td className="px-3 py-2 text-center bg-slate-50/60">
                      <div className="flex flex-col gap-1 max-w-[100px] mx-auto">
                        <button
                          disabled={
                            actionLoadingId === booking.id ||
                            booking.status === "Confirmed"
                          }
                          onClick={() =>
                            handleModifyStatus(booking.id, "Confirmed")
                          }
                          className="text-[10px] font-bold bg-blue-50 text-blue-700 py-0.5 rounded border border-blue-200 hover:bg-blue-100 transition disabled:opacity-30"
                        >
                          Confirm
                        </button>
                        <button
                          disabled={
                            actionLoadingId === booking.id ||
                            booking.status === "Completed"
                          }
                          onClick={() =>
                            handleModifyStatus(booking.id, "Completed")
                          }
                          className="text-[10px] font-bold bg-green-50 text-green-700 py-0.5 rounded border border-green-200 hover:bg-green-100 transition disabled:opacity-30"
                        >
                          Complete
                        </button>
                        <button
                          disabled={
                            actionLoadingId === booking.id ||
                            booking.status === "Pending"
                          }
                          onClick={() =>
                            handleModifyStatus(booking.id, "Pending")
                          }
                          className="text-[10px] font-bold bg-yellow-50 text-yellow-700 py-0.5 rounded border border-yellow-200 hover:bg-yellow-100 transition disabled:opacity-30"
                        >
                          Reset
                        </button>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="text-xs font-semibold bg-gray-100 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-200 transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        disabled={
                          actionLoadingId === booking.id ||
                          booking.status === "Cancelled" ||
                          booking.status === "Completed"
                        }
                        className="text-xs font-semibold bg-red-50 text-red-600 px-2 py-1 rounded-md hover:bg-red-100 transition disabled:opacity-30 disabled:pointer-events-none"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ==================== 2. MOBILE VIEW (STACKED CARD MODE) ==================== */}
          <div className="block md:hidden space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl border p-4 shadow-sm space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-xs font-bold text-gray-400">
                      #{booking.id.slice(-4).toUpperCase()}
                    </span>
                    <h4 className="font-bold text-gray-900 mt-0.5">
                      {serviceNames[booking.serviceId] || booking.serviceId}
                    </h4>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadgeClass(booking.status)}`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs border-t border-b border-gray-50 py-2 text-gray-600">
                  <p>
                    <span className="font-medium text-gray-400">Duration:</span>{" "}
                    {booking.hoursNeeded} Hours
                  </p>
                  <p>
                    <span className="font-medium text-gray-400">Price:</span> ৳
                    {booking.totalPrice}
                  </p>
                  <p className="col-span-2 truncate">
                    <span className="font-medium text-gray-400">Location:</span>{" "}
                    {booking.locationRaw}
                  </p>
                </div>

                {/* Simulator Controls inside the Mobile Card */}
                <div className="bg-slate-50 p-2 rounded-lg">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1.5 text-center">
                    Simulate Stage Pipeline
                  </p>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      disabled={
                        actionLoadingId === booking.id ||
                        booking.status === "Confirmed"
                      }
                      onClick={() =>
                        handleModifyStatus(booking.id, "Confirmed")
                      }
                      className="text-[11px] font-bold bg-white text-blue-700 py-1 rounded border border-blue-100 shadow-sm text-center disabled:opacity-30"
                    >
                      Confirm
                    </button>
                    <button
                      disabled={
                        actionLoadingId === booking.id ||
                        booking.status === "Completed"
                      }
                      onClick={() =>
                        handleModifyStatus(booking.id, "Completed")
                      }
                      className="text-[11px] font-bold bg-white text-green-700 py-1 rounded border border-green-100 shadow-sm text-center disabled:opacity-30"
                    >
                      Complete
                    </button>
                    <button
                      disabled={
                        actionLoadingId === booking.id ||
                        booking.status === "Pending"
                      }
                      onClick={() => handleModifyStatus(booking.id, "Pending")}
                      className="text-[11px] font-bold bg-white text-yellow-700 py-1 rounded border border-yellow-100 shadow-sm text-center disabled:opacity-30"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                {/* Standard Action Buttons inside Mobile Card */}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => setSelectedBooking(booking)}
                    className="flex-1 text-center text-xs font-semibold bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition"
                  >
                    View Parameters
                  </button>
                  <button
                    onClick={() => handleCancelBooking(booking.id)}
                    disabled={
                      actionLoadingId === booking.id ||
                      booking.status === "Cancelled" ||
                      booking.status === "Completed"
                    }
                    className="flex-1 text-center text-xs font-semibold bg-red-50 text-red-600 py-2 rounded-md hover:bg-red-100 transition disabled:opacity-30"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
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
