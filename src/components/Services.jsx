import { SERVICES } from "../data/constants";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section id="services" className="bg-slate-50 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Reveal>
            <span className="inline-block bg-[#0d1f3c] text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded mb-4">
              Our Services
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0d1f3c] tracking-tight leading-tight mb-4">
              Everything your business
              <br />
              <span className="text-[#f26522]">needs online</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-slate-500 text-base max-w-md mx-auto leading-relaxed">
              From a simple landing page to a full e-commerce store — we build
              it right the first time.
            </p>
          </Reveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <Reveal key={service.name} delay={i * 80}>
              <div className="group bg-white border border-slate-200 rounded-2xl p-8 hover:-translate-y-2 hover:shadow-xl hover:border-[#f26522] transition-all duration-300 relative overflow-hidden cursor-default h-full">
                <div className="absolute top-0 left-0 w-1 h-0 bg-[#f26522] group-hover:h-16 transition-all duration-300 rounded-b" />
                <div className="w-12 h-12 bg-orange-50 group-hover:bg-[#f26522] rounded-xl flex items-center justify-center text-xl mb-5 transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-[#0d1f3c] font-bold text-lg mb-3 tracking-tight">
                  {service.name}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
