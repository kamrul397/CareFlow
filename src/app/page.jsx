import About from "@/features/home/About";
import Hero from "@/features/home/Hero";
import ServicesOverview from "@/features/home/ServicesOverview";
import Testimonials from "@/features/home/Testimonials";

// Static SEO Metadata Challenge Requirements fulfilled
export const metadata = {
  title: "Home | Care.xyz - Reliable Family Caregiving Services",
  description:
    "Book verified caretakers for baby care, elderly services, and home patient care services quickly and securely.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <ServicesOverview />
      <Testimonials />
    </>
  );
}
