import { useEffect } from "react";
import { STATS } from "../data/constants";
import { trackVisit, trackClick } from "../lib/analytics";

// A simple drawing of the kind of site we build: name, what you sell, and a
// way to reach you. Deliberately plain, no real client is implied.
function LaptopSketch() {
  return (
    <div className="w-full max-w-md mx-auto" aria-hidden="true">
      <div className="bg-navy rounded-t-xl p-2 pb-0">
        <div className="bg-white rounded-t-md overflow-hidden">
          <div className="border-b border-line px-4 py-2.5 flex items-center justify-between">
            <span className="text-navy text-[11px] font-bold">Your Business</span>
            <div className="flex gap-3">
              {["Products", "About", "Contact"].map((l) => (
                <span key={l} className="text-muted text-[9px]">{l}</span>
              ))}
            </div>
          </div>
          <div className="bg-paper px-5 py-6">
            <p className="font-display text-navy font-bold text-lg leading-tight mb-1.5">
              What you sell, and where to find you.
            </p>
            <p className="text-muted text-[10px] leading-relaxed mb-4">
              Opening hours, location and prices, all on one page.
            </p>
            <div className="flex gap-2 mb-5">
              <span className="bg-[#25d366] text-white text-[9px] font-semibold px-3 py-1.5 rounded">
                Message on WhatsApp
              </span>
              <span className="border border-line bg-white text-navy text-[9px] font-semibold px-3 py-1.5 rounded">
                Call us
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="bg-white border border-line rounded">
                  <div className="h-10 bg-line/60 rounded-t" />
                  <div className="p-1.5">
                    <div className="h-1.5 w-3/4 bg-line rounded mb-1" />
                    <div className="h-1.5 w-1/2 bg-brand-orange/70 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-navy-light h-3 rounded-b-md" />
      <div className="h-2 bg-navy mx-16 rounded-b" />
    </div>
  );
}

export default function Hero() {
  useEffect(() => { trackVisit(); }, []);

  return (
    <section className="bg-white px-4 sm:px-6">
      <div className="max-w-6xl mx-auto pt-14 pb-16 lg:pt-20 lg:pb-20 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
        <div>
          <p className="text-muted text-sm mb-4">Web design studio · Accra, Ghana</p>
          <h1 className="text-[2.5rem] leading-[1.08] sm:text-5xl lg:text-[3.5rem] font-bold text-navy tracking-tight mb-6">
            Websites for businesses in Ghana, built in Accra.
          </h1>
          <p className="text-ink/80 text-lg leading-relaxed mb-8 max-w-xl">
            We build websites, online stores and landing pages for business owners
            who want customers to find them on Google and reach them on WhatsApp.
            You see the design before we build anything, and you deal with us
            directly from the first message to launch day.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              onClick={() => trackClick("hero_contact_btn")}
              className="bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold px-6 py-3 rounded-md transition-colors"
            >
              Get a free quote
            </a>
            <a
              href="#services"
              onClick={() => trackClick("hero_services_btn")}
              className="border border-navy/20 hover:border-navy text-navy font-semibold px-6 py-3 rounded-md transition-colors"
            >
              See what we build
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-2 sm:grid-cols-4 border-t border-line">
            {STATS.map((s) => (
              <div key={s.label} className="pt-4 pr-4">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-navy text-2xl font-bold leading-none mb-1">{s.val}</dd>
                <dd className="text-muted text-[13px] leading-snug">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <LaptopSketch />
      </div>
    </section>
  );
}
