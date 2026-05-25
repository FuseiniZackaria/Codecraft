import Reveal from "./Reveal";
import { trackClick } from "../lib/analytics";

export default function CTABanner() {
  return (
    <section className="bg-[#f26522] py-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-black/10 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <Reveal>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Ready to build your<br />dream website?
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-white/85 text-sm leading-relaxed mb-10">
            Get in touch today and let's talk about your project. Fast response,
            fair pricing, and results that speak for themselves.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://wa.me/233202457446" target="_blank" rel="noreferrer"
              onClick={() => trackClick("cta_whatsapp_btn")}
              className="inline-flex items-center gap-2 bg-white text-[#f26522] font-bold px-7 py-3.5 rounded-full hover:-translate-y-1 hover:shadow-xl transition-all duration-200">
              📱 WhatsApp Us Now
            </a>
            <a href="#contact" onClick={() => trackClick("cta_message_btn")}
              className="inline-flex items-center gap-2 border-2 border-white/60 hover:border-white hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200">
              Send a Message →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
