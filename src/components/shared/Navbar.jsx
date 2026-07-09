"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
// Import your central global state hook

export default function Navbar() {
  // Hook into your Auth Context: pull both the user data AND the logout function
  const { currentUser, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center shadow-sm">
      <Link href="/" className="text-xl font-bold text-blue-600">
        Care.xyz
      </Link>

      <div className="flex items-center space-x-6">
        <Link href="/" className="text-sm text-gray-600 hover:text-blue-600">
          Home
        </Link>
        <Link
          href="/my-bookings"
          className="text-sm text-gray-600 hover:text-blue-600"
        >
          My Bookings
        </Link>

        {currentUser ? (
          <>
            {/* Displaying name pulled directly from the global context memory after a successful login lookup */}
            <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full">
              👋 Welcome, {currentUser.name}
            </span>
            <button
              onClick={logout}
              className="text-sm font-semibold text-red-500 hover:text-red-700"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            {/* Standard "Unauthenticated" links (shown to guests) */}
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
