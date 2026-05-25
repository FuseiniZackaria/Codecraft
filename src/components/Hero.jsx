import { useEffect } from "react";
import { TRUST_BADGES } from "../data/constants";
import { trackVisit, trackClick } from "../lib/analytics";

const SCREEN_FEATURES = [
  { icon: "⚡", label: "Fast Performance" },
  { icon: "📱", label: "Mobile Friendly" },
  { icon: "🔍", label: "SEO Optimized" },
];

export default function Hero() {
  useEffect(() => { trackVisit(); }, []);

  return (
    <section className="bg-white pt-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 bg-orange-50 text-[#f26522] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-6 animate-[fadeUp_0.7s_ease_both]">
            <span className="w-2 h-2 bg-[#f26522] rounded-full animate-pulse" />
            Websites that convert
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-[#0d1f3c] leading-tight tracking-tight mb-5 animate-[fadeUp_0.7s_0.1s_ease_both]">
            Build Your<br />
            <span className="text-[#f26522]">Dream Website</span>
          </h1>
          <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-md animate-[fadeUp_0.7s_0.2s_ease_both]">
            We create fast, secure, and high-converting websites for businesses.
          </p>
          <div className="flex flex-wrap gap-4 animate-[fadeUp_0.7s_0.3s_ease_both]">
            <a href="#contact" onClick={() => trackClick("hero_contact_btn")}
              className="inline-flex items-center gap-2 bg-[#f26522] hover:bg-[#ff7a35] text-white font-bold px-7 py-3.5 rounded-full transition-all hover:-translate-y-0.5 shadow-lg shadow-orange-200">
              Contact Us Now <span>→</span>
            </a>
            <a href="#services" onClick={() => trackClick("hero_services_btn")}
              className="inline-flex items-center gap-2 border-2 border-slate-200 hover:border-[#0d1f3c] text-[#0d1f3c] font-semibold px-6 py-3 rounded-full transition-all">
              Our Services
            </a>
          </div>
        </div>

        {/* Right — Laptop Mockup */}
        <div className="flex flex-col items-center animate-[fadeUp_0.7s_0.4s_ease_both]">
          <div className="w-full max-w-md">
            <div className="bg-[#1a1a2e] rounded-t-2xl p-2 pb-0 shadow-2xl">
              <div className="bg-white rounded-t-lg overflow-hidden">
                <div className="bg-[#0d1f3c] px-4 py-2 flex items-center justify-between">
                  <span className="text-white text-xs font-extrabold font-mono">CODECRAFT &lt;/&gt;</span>
                  <div className="flex gap-3">
                    {["Home","Services","About","Contact"].map(l => (
                      <span key={l} className="text-white/50 text-[9px]">{l}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-5">
                  <p className="text-[#0d1f3c] font-extrabold text-lg leading-tight mb-1">
                    Build Your Own<br /><span className="text-[#f26522]">Dream Website</span>
                  </p>
                  <p className="text-slate-400 text-[9px] mb-3 leading-relaxed">
                    Modern. Fast. Professional.<br />We create high-performing websites that help your business grow.
                  </p>
                  <span className="inline-block bg-[#f26522] text-white text-[8px] font-bold px-3 py-1.5 rounded-full mb-4">
                    Get Started →
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {SCREEN_FEATURES.map(({ icon, label }) => (
                      <div key={label} className="bg-white rounded-lg p-2 text-center shadow-sm">
                        <div className="text-base mb-1">{icon}</div>
                        <p className="text-[7px] text-slate-500 font-semibold">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-[#252540] h-3 rounded-b" />
            </div>
            <div className="h-3 bg-[#1a1a2e] mx-12 rounded-b-lg" />
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {TRUST_BADGES.map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 bg-[#0d1f3c] text-white/80 text-xs font-semibold px-4 py-2 rounded-full">
                <span className="w-6 h-6 bg-[#f26522] rounded-full flex items-center justify-center text-xs">{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
