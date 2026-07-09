export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div>
            <p className="text-sm">
              &copy; {new Date().getFullYear()}{" "}
              <span className="text-white font-semibold">Care.xyz</span>. All
              rights reserved.
            </p>
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
