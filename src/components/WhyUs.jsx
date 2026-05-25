import { STATS, WHY_POINTS } from "../data/constants";
import Reveal from "./Reveal";

export default function WhyUs() {
  return (
    <section id="why-us" className="bg-[#0d1f3c] py-24 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#f26522]/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left — Stats */}
        <div>
          <Reveal>
            <span className="inline-block bg-[#f26522] text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded mb-6">
              Why CodeCraft
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5">
              We don't just build websites — we build{" "}
              <span className="text-[#f26522]">growth engines.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-white/60 text-sm leading-relaxed mb-10">
              Every site we deliver is optimized for speed, search engines, and
              conversion. Our clients see real business results.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 gap-5">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={300 + i * 80}>
                <div className="border border-white/10 rounded-xl p-5 bg-white/5">
                  <p className="text-[#f26522] text-4xl font-extrabold tracking-tight leading-none mb-2">
                    {stat.val}
                  </p>
                  <p className="text-white/50 text-xs font-medium">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right — Feature Points */}
        <div className="flex flex-col gap-4">
          {WHY_POINTS.map((point, i) => (
            <Reveal key={point.title} delay={i * 100}>
              <div className="flex items-start gap-4 border border-white/10 rounded-xl p-5 bg-white/5 hover:bg-[#f26522]/10 hover:border-[#f26522]/40 transition-all duration-300">
                <div className="w-10 h-10 bg-[#f26522] rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                  {point.icon}
                </div>
                <div>
                  <p className="text-white font-bold text-sm mb-1">{point.title}</p>
                  <p className="text-white/50 text-xs leading-relaxed">{point.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
