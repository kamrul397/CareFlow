"use client";

import Link from "next/link";
// Step 1: Import your auth context hook to read app memory
import { useAuth } from "@/context/AuthContext";

export default function Hero() {
  // Step 2: Extract currentUser from your global React context state
  const { currentUser } = useAuth();

  return (
    <section className="relative bg-gradient-to-r from-blue-50 via-indigo-50 to-white overflow-hidden py-16 sm:py-24 lg:py-32">
      {/* Background decoration elements */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content & Actions */}
          <div className="space-y-6 max-w-2xl text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
              🛡️ 100% Verified Caregivers
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-none">
              Reliable & Trusted <br />
              <span className="text-blue-600 drop-shadow-sm">
                Care Services
              </span>{" "}
              <br />
              For Your Family
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Find and hire professional, strictly vetted caretakers for
              babysitting, elderly support, and specialized home health care. We
              make caregiving easy, secure, and accessible for everyone.
            </p>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Link
                href="#services"
                className="bg-blue-600 text-white text-center px-8 py-3.5 rounded-xl font-bold text-base hover:bg-blue-700 active:scale-95 transition shadow-lg shadow-blue-500/20"
              >
                Explore Services
              </Link>

              {/* Step 3: Conditional Rendering Logic */}
              {!currentUser ? (
                <Link
                  href="/register"
                  className="bg-white text-gray-700 text-center px-8 py-3.5 rounded-xl font-semibold text-base border border-gray-200 hover:bg-gray-50 active:scale-95 transition shadow-sm"
                >
                  Create Account
                </Link>
              ) : (
                <Link
                  href="/my-bookings"
                  className="bg-blue-50 text-blue-700 text-center px-8 py-3.5 rounded-xl font-bold text-base border border-blue-200 hover:bg-blue-100 active:scale-95 transition shadow-sm"
                >
                  Go to Dashboard →
                </Link>
              )}
            </div>

            {/* Quick trust metrics row */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-gray-200/60 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-gray-900">
                  10k+
                </p>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                  Bookings
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-gray-900">
                  500+
                </p>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                  Caretakers
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-gray-900">
                  4.9★
                </p>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                  Rating
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Component Mockup */}
          <div className="w-full h-72 sm:h-96 lg:h-[450px] bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col justify-between p-6 relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

            {/* Header layout inside simulation container */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <span className="text-xs font-mono text-gray-400">
                Care.xyz Dashboard v1.0
              </span>
            </div>

            {/* Central illustration or placeholder layout */}
            <div className="flex-grow flex flex-col justify-center items-center text-center space-y-3 p-4">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                🤝
              </div>
              <p className="text-sm font-bold text-gray-800">
                Caretaker Matching System
              </p>
              <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                Our dynamic routing matches available care experts in your area
                in under 10 minutes.
              </p>
            </div>

            {/* Simulated notification tag */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex items-center justify-between text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-2 text-green-600">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                System Live
              </span>
              <span>Dhaka, BD</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
