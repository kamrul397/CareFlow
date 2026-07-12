"use client";

import { useAuth } from "@/context/AuthContext";
import { logoutUser } from "@/app/actions/auth"; // 🌟 Import the server action we just added!
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const router = useRouter(); // 🌟 For refreshing the active layout state

  const handleLogout = async () => {
    try {
      // 1. Fire the server action to drop the cookie securely
      await logoutUser();

      // 2. Clear the client React context (removes care_user from localStorage)
      logout();

      // 3. Force Next.js to re-evaluate the middleware state and route to login
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Error during click logout execution:", error);
    }
  };

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
            <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full">
              👋 Welcome, {currentUser.name}
            </span>
            <button
              onClick={handleLogout} // 🌟 Swapped 'logout' directly for our coordinated handler
              className="text-sm font-semibold text-red-500 hover:text-red-700 cursor-pointer"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
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
