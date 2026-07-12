"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Import your live lookup action
import { loginUser } from "../actions/auth";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
// Import your global context hook to update app memory

export default function LoginPage() {
  const router = useRouter();

  // Create a bridge to the 'login' function inside your global context
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Trigger your database lookup action (finds user in MongoDB, verifies password hash)
    const result = await loginUser(formData);

    if (!result.success) {
      setError(result.error);
      setLoading(false);
    } else {
      // Step A: Update your global React context state instantly
      login(result.user);

      setSuccess(true);
      setLoading(false);

      // Clear fields for visual cleanup
      setFormData({ email: "", password: "" });

      // Step B: Redirect them to check their existing bookings tracking ledger (view state will update immediately upon redirect)
      router.refresh();
      router.push("/my-bookings");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Log in to manage your care requests
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 mb-4">
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-700 text-sm p-3 rounded-lg border border-green-100 mb-4">
            🎉 Login credentials verified! Accessing dashboard...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white text-sm font-bold py-2.5 rounded-lg hover:bg-blue-700 transition shadow-sm mt-2 disabled:opacity-50"
          >
            {loading ? "Verifying Account..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          Don't have an account yet?{" "}
          <Link
            href="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
}
