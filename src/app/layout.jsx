import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { AuthProvider } from "@/context/AuthContext";

// Static SEO metadata for the home wrapper
export const metadata = {
  title: "Care.xyz - Reliable Home Care Services",
  description: "Find trusted babysitters and elderly caretakers easily.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="bg-gray-50 text-gray-900 min-h-screen flex flex-col"
        suppressHydrationWarning={true}
      >
        {/* Navbar globally mounted at the top */}
        <AuthProvider>
          <Navbar />

          {/* Dynamic page contents are injected directly here */}
          <main className="flex-grow">{children}</main>

          {/* Footer globally mounted at the bottom */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
