export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-b border-gray-100 pb-16 mb-16">
          <div>
            <p className="text-4xl font-extrabold text-blue-600">10,000+</p>
            <p className="text-sm font-medium text-gray-500 mt-1">
              Bookings Completed
            </p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-blue-600">98%</p>
            <p className="text-sm font-medium text-gray-500 mt-1">
              Satisfaction Rate
            </p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-blue-600">500+</p>
            <p className="text-sm font-medium text-gray-500 mt-1">
              Verified Caregivers
            </p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-blue-600">24/7</p>
            <p className="text-sm font-medium text-gray-500 mt-1">
              Active Support
            </p>
          </div>
        </div>

        {/* Individual Success Review Example */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl italic text-gray-600">
            "Care.xyz changed how our family handles elderly management. Finding
            a verified caretaker for my grandmother took less than 10 minutes,
            and the transparency is outstanding."
          </p>
          <div className="mt-4">
            <p className="font-semibold text-gray-900">Rahat Rahman</p>
            <p className="text-sm text-gray-400">Dhaka, Bangladesh</p>
          </div>
        </div>
      </div>
    </section>
  );
}
