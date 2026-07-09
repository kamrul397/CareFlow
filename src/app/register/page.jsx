"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// Import your live server-side database insertion engine
import { registerUser } from "../actions/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nid: "",
    name: "",
    email: "",
    contact: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // New state to control button loading look

  const validatePassword = (pass) => {
    if (pass.length < 6) return "Password must be at least 6 characters long.";
    if (!/[A-Z]/.test(pass))
      return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(pass))
      return "Password must contain at least one lowercase letter.";
    return null;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Run client password validations first
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      setLoading(false);
      return;
    }

    // Call the Server Action to process data in MongoDB
    const result = await registerUser(formData);

    if (!result.success) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);

      // Clear form inputs
      setFormData({ nid: "", name: "", email: "", contact: "", password: "" });

      // Dynamic redirect tracking
      setTimeout(() => {
        router.push("/booking/baby-care");
      }, 1500);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Create an Account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Join Care.xyz to find verified home caregivers
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 mb-4">
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-700 text-sm p-3 rounded-lg border border-green-100 mb-4">
            🎉 Registration successful! Redirecting to booking...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              NID Number
            </label>
            <input
              type="text"
              name="nid"
              required
              value={formData.nid}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              placeholder="1234567890"
            />
          </div>

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
              Contact Number
            </label>
            <input
              type="text"
              name="contact"
              required
              value={formData.contact}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              placeholder="017XXXXXXXX"
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
            {loading ? "Creating Account..." : "Register Now"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
