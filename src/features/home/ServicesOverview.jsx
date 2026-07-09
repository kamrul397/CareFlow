import Link from "next/link";

// Static layout data matching project requirements
const dummyServices = [
  {
    id: "baby-care",
    title: "Baby Care & Babysitting",
    description:
      "Trusted, nurturing support and active supervision for your little ones.",
    icon: "🍼",
  },
  {
    id: "elderly-service",
    title: "Elderly Support Care",
    description:
      "Empathetic assistance, companionship, and dynamic health tracking for seniors.",
    icon: "👵",
  },
  {
    id: "sick-people-service",
    title: "Sick People Service",
    description:
      "Specialized home health care tailored to recovering patients or medical routines.",
    icon: "❤️",
  },
];

export default function ServicesOverview() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
          <p className="text-gray-500 mt-2">
            Choose the optimal care environment tailored to your
            requirements[cite: 5].
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dummyServices.map((service) => (
            <div
              key={service.id}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <span className="text-4xl mb-4 block">{service.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Dynamic route generation /service/[id] */}
              <Link
                href={`/service/${service.id}`}
                className="text-blue-600 font-semibold text-sm inline-flex items-center hover:text-blue-700 transition group"
              >
                View Details
                <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform ml-1">
                  →
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
