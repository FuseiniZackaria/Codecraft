import { trackClick } from "../lib/analytics";
import { WHATSAPP_URL } from "../data/constants";
import { WhatsAppIcon } from "./Icons";

export default function CTABanner() {
  return (
    <section className="bg-brand-orange px-4 sm:px-6 py-12 lg:py-14">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight mb-2">
            Have a project in mind?
          </h2>
          <p className="text-white/90 leading-relaxed">
            Send us a WhatsApp message and tell us what you need. We reply within
            24 hours with a plan and a clear price.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 flex-shrink-0">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackClick("cta_whatsapp_btn")}
            className="inline-flex items-center gap-2 bg-white text-navy font-semibold px-5 py-3 rounded-md hover:bg-paper transition-colors"
          >
            <WhatsAppIcon className="w-5 h-5 text-[#25d366]" />
            Message us on WhatsApp
          </a>
          <a
            href="#contact"
            onClick={() => trackClick("cta_message_btn")}
            className="inline-flex items-center border border-white/70 hover:border-white hover:bg-white/10 text-white font-semibold px-5 py-3 rounded-md transition-colors"
          >
            Use the form instead
          </a>
        </div>
      </div>
    </section>
  );
}
