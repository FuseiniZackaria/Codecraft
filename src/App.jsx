import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import CTABanner from "./components/CTABanner";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminApp from "./admin/AdminApp";
import BlogPost from "./Pages/BlogPost";
import ServicePage from "./Pages/ServicePage";
import { WhatsAppIcon } from "./components/Icons";
import { WHATSAPP_URL } from "./data/constants";
import { trackClick } from "./lib/analytics";

const WhatsAppButton = () => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noreferrer"
    onClick={() => trackClick("whatsapp_float_btn")}
    className="fixed bottom-5 right-5 z-50 w-14 h-14 bg-[#25d366] hover:bg-[#1ebe5b] text-white rounded-full flex items-center justify-center shadow-md transition-colors"
    aria-label="Chat on WhatsApp"
  >
    <WhatsAppIcon className="w-7 h-7" />
  </a>
);

function MainSite() {
  return (
    <div className="font-sans text-ink bg-white">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Services />
        <Portfolio />
        <Process />
        <Testimonials />
        <Blog />
        <CTABanner />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  if (window.location.pathname.startsWith("/admin")) {
    return <AdminApp />;
  }

  return (
    <Routes>
      <Route path="/" element={<MainSite />} />
      <Route path="/blog/:id" element={<BlogPost />} />
      <Route path="/services/:slug" element={<ServicePage />} />
    </Routes>
  );
}
