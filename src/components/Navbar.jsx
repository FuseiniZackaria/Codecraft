import { useState } from "react";
import { NAV_LINKS } from "../data/constants";

const toHash = (link) => `/#${link.toLowerCase().replace(" ", "-")}`;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span className="bg-navy text-brand-orange font-bold text-sm px-2 py-1 rounded font-mono">
            &lt;/&gt;
          </span>
          <span className="font-display text-navy font-extrabold text-lg tracking-tight">
            CODECRAFT
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a href={toHash(link)} className="text-muted hover:text-ink text-[15px] transition-colors">
                {link}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/#contact"
              className="bg-brand-orange hover:bg-brand-orange-dark text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
            >
              Get a quote
            </a>
          </li>
        </ul>

        <button
          className="md:hidden text-navy text-sm font-semibold border border-line rounded-md px-3 py-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-line px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={toHash(link)}
              className="text-ink py-2"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <a
            href="/#contact"
            className="mt-2 bg-brand-orange text-white font-semibold text-center py-2.5 rounded-md"
            onClick={() => setMenuOpen(false)}
          >
            Get a quote
          </a>
        </div>
      )}
    </nav>
  );
}
