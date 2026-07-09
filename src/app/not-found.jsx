import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="bg-blue-50 text-blue-600 text-6xl font-black px-6 py-3 rounded-2xl mb-4">
        404
      </div>
      <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-500 max-w-sm mb-6">
        Sorry, the care service path or profile option you are looking for does
        not exist or has changed.
      </p>
      <Link
        href="/"
        className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm"
      >
        Return to Home
      </Link>
    </div>
  );
}
