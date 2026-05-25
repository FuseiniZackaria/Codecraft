import { useState, useEffect } from "react";
import { NAV_LINKS } from "../data/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/95"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="bg-[#0d1f3c] text-[#f26522] font-extrabold text-sm px-2 py-1 rounded-md font-mono">
            &lt;/&gt;
          </span>
          <span className="text-[#0d1f3c] font-extrabold text-lg tracking-tight">
            CODECRAFT
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase().replace(" ", "-")}`}
                className="text-slate-500 hover:text-[#0d1f3c] text-sm font-medium transition-colors"
              >
                {link}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="bg-[#f26522] hover:bg-[#ff7a35] text-white text-sm font-bold px-5 py-2 rounded-full transition-all hover:-translate-y-0.5 duration-150"
            >
              Get Started →
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-[#0d1f3c] text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(" ", "-")}`}
              className="text-slate-600 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-[#f26522] text-white font-bold text-center py-2 rounded-full"
            onClick={() => setMenuOpen(false)}
          >
            Get Started →
          </a>
        </div>
      )}
    </nav>
  );
}
