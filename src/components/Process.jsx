import { PROCESS } from "../data/constants";
import Reveal from "./Reveal";

export default function Process() {
  return (
    <section id="process" className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Reveal>
            <span className="inline-block bg-[#0d1f3c] text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded mb-4">
              How It Works
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0d1f3c] tracking-tight leading-tight">
              From idea to{" "}
              <span className="text-[#f26522]">live website</span>
              <br />
              in days, not months.
            </h2>
          </Reveal>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#f26522] to-[#0d1f3c] z-0" />

          {PROCESS.map((step, i) => (
            <Reveal key={step.title} delay={i * 100}>
              <div className="text-center relative z-10 group">
                <div className="w-16 h-16 rounded-full bg-white border-4 border-[#f26522] flex items-center justify-center mx-auto mb-6 text-[#f26522] font-extrabold text-xl shadow-md shadow-orange-100 group-hover:bg-[#f26522] group-hover:text-white transition-all duration-300">
                  {step.num}
                </div>
                <h3 className="text-[#0d1f3c] font-bold text-base mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
