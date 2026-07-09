import Link from "next/link";
import { notFound } from "next/navigation";

// Mock data mapping onto our dynamic ID keys
const servicesData = {
  "baby-care": {
    title: "Baby Care & Babysitting",
    tagline: "Safe, nurturing, and reliable care for your little ones.",
    description:
      "আমাদের দক্ষ বেবিসিটাররা আপনার শিশুর যত্ন, খাবার খাওয়ানো, এবং খেলার মাধ্যমে তাদের মেধা বিকাশে সহায়তা করবে।",
    chargePerHour: 150,
    features: [
      "Background Verified Caregivers",
      "First-Aid Trained Specialists",
      "Flexible Hourly/Daily Schedules",
    ],
  },
  "elderly-service": {
    title: "Elderly Support Care",
    tagline:
      "Compassionate assistance and dynamic health tracking for seniors.",
    description:
      "বয়স্ক বাবা-মার সার্বক্ষণিক সেবা, ওষুধ খাওয়ানো, এবং মানসিক সাহচর্য নিশ্চিত করতে আমাদের অভিজ্ঞ কেয়ারগিভাররা নিয়োজিত।",
    chargePerHour: 200,
    features: [
      "Companion Care & Conversation",
      "Medication Reminders",
      "Blood Pressure & Sugar Tracking",
    ],
  },
  "sick-people-service": {
    title: "Sick People Service",
    tagline: "Specialized home health care tailored to recovering patients.",
    description:
      "অসুস্থ ব্যক্তিদের দ্রুত সুস্থতা নিশ্চিত করতে নার্সিং কেয়ার, ড্রেসিং, এবং সঠিক নিয়মে খাবার ও ইনজেকশন মেইনটেইন করার পেশাদার সেবা।",
    chargePerHour: 250,
    features: [
      "Post-Hospitalization Recovery",
      "Vital Sign Monitoring",
      "Diet & Nutrition Management",
    ],
  },
};

// CHALLENGE REQUIREMENT: Dynamic Metadata Execution
export async function generateMetadata({ params }) {
  const { service_id } = await params;
  const service = servicesData[service_id];

  return {
    title: service ? `${service.title} | Care.xyz` : "Service Not Found",
    description: service
      ? service.tagline
      : "Explore professional caregiving services.",
  };
}

export default async function ServiceDetailPage({ params }) {
  // Read the variable path parameters
  const { service_id } = await params;
  const service = servicesData[service_id];

  // Trigger custom 404 if the user types an invalid path (e.g., /service/unknown)
  if (!service) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Back navigation link */}
      <Link
        href="/"
        className="text-sm font-medium text-blue-600 hover:underline mb-6 inline-block"
      >
        ← Back to all services
      </Link>

      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
        <div className="border-b border-gray-100 pb-6 mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            {service.title}
          </h1>
          <p className="text-gray-500 text-lg">{service.tagline}</p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              About this Service
            </h3>
            <p className="text-gray-600 leading-relaxed text-base">
              {service.description}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              What is Included:
            </h3>
            <ul className="space-y-2">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-center text-sm text-gray-600">
                  <span className="text-green-500 font-bold mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <p className="text-xs text-blue-600 font-bold tracking-wider uppercase">
                Estimated Rate
              </p>
              <p className="text-2xl font-black text-gray-900 mt-1">
                ৳{service.chargePerHour}{" "}
                <span className="text-sm font-normal text-gray-500">
                  / Hour
                </span>
              </p>
            </div>

            {/* Navigates directly to the secure, private booking workspace */}
            <Link
              href={`/booking/${service_id}`}
              className="w-full sm:w-auto bg-blue-600 text-center text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-sm"
            >
              Book Service Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
