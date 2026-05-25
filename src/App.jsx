import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import WhyUs from "./components/WhyUs";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import CTABanner from "./components/CTABanner";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminApp from "./admin/AdminApp";


// Simple path-based routing — no react-router needed
const isAdmin = window.location.pathname.startsWith("/admin");

export default function App() {
  if (isAdmin) return <AdminApp />;

  return (
    <div className="font-sans">
      <LoadingScreen />
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Services />
        <Portfolio/>
        <WhyUs />
        <Process />
        <Testimonials />
        <Blog />
        <CTABanner />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
