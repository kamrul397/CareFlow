"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { createNewBooking } from "@/app/actions/bookings";

// Simple mapping to enrich service info based on the dynamic ID
const SERVICE_DIRECTORY = {
  cleaning: {
    title: "Deep Home Cleaning",
    description: "Standard room, kitchen, and bathroom sanitation.",
    icon: "🧹",
  },
  plumbing: {
    title: "Emergency Plumbing",
    description: "Leaking pipes, drain unclogging, and fixture repairs.",
    icon: "🔧",
  },
  electrical: {
    title: "Electrical Support",
    description: "Wiring diagnostic, fixture replacements, and panel fixes.",
    icon: "⚡",
  },
};

export default function BookingFormPage({ params }) {
  const router = useRouter();
  const { currentUser } = useAuth();

  // Safely unwrap the dynamic route params path
  const unwrappedParams = use(params);
  const serviceId = unwrappedParams.service_id;

  // Get service text details or fallback gracefully if no match found
  const serviceDetails = SERVICE_DIRECTORY[serviceId?.toLowerCase()] || {
    title: serviceId
      ? `${serviceId.charAt(0).toUpperCase() + serviceId.slice(1)} Service`
      : "Professional Service",
    description:
      "Expert assistance tailored completely to your project demands.",
    icon: "💼",
  };

  const [hours, setHours] = useState(2);
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const RATE_PER_HOUR = 200;
  const totalPrice = hours * RATE_PER_HOUR;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return router.push("/login");

    setIsSubmitting(true);

    const payload = {
      userId: currentUser.id || currentUser._id,
      serviceId: serviceId,
      hoursNeeded: hours,
      location: address,
      totalPrice: totalPrice,
    };

    const result = await createNewBooking(payload);

    if (result.success) {
      router.push("/my-bookings");
      router.refresh();
    } else {
      setIsSubmitting(false);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        {/* Service Header Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white text-center">
          <div className="text-4xl mb-2">{serviceDetails.icon}</div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            {serviceDetails.title}
          </h2>
          <p className="text-blue-100 text-sm mt-1 px-4">
            {serviceDetails.description}
          </p>
        </div>

        {/* Dynamic Pricing Banner */}
        <div className="bg-blue-50/50 border-b border-gray-100 px-6 py-3 flex justify-between text-sm text-gray-600 font-medium">
          <span>Rate: ${RATE_PER_HOUR}/hr</span>
          <span className="text-indigo-600">Secure Checkout</span>
        </div>

        {/* Booking Form Input Area */}
        <form onSubmit={handleFormSubmit} className="p-6 space-y-5">
          {/* Address field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Service Location Address
            </label>
            <textarea
              required
              rows={3}
              placeholder="123 Main St, Apartment 4B..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none shadow-sm placeholder-gray-400"
            />
          </div>

          {/* Hours Counter input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Hours Needed
            </label>
            <div className="relative rounded-xl shadow-sm">
              <input
                type="number"
                min="1"
                max="24"
                required
                value={hours}
                onChange={(e) =>
                  setHours(Math.max(1, parseInt(e.target.value) || 0))
                }
                className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400 text-sm">
                hours
              </div>
            </div>
          </div>

          <hr className="border-gray-100 my-2" />

          {/* Pricing breakdown summary */}
          <div className="flex justify-between items-center bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
              Total Estimate
            </div>
            <div className="text-2xl font-black text-gray-900">
              ${totalPrice.toLocaleString()}
            </div>
          </div>

          {/* Dynamic Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white p-3.5 rounded-xl font-bold text-sm shadow-sm hover:shadow transition duration-150 flex justify-center items-center gap-2 ${
              isSubmitting ? "opacity-70 cursor-not-allowed bg-blue-500" : ""
            }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing Booking...
              </>
            ) : (
              "Confirm & Book Now"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
