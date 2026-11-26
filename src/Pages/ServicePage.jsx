import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import { WhatsAppIcon } from "../components/Icons";
import { SERVICES, PROCESS, WHATSAPP_URL } from "../data/constants";
import { trackClick } from "../lib/analytics";

function NotFound() {
  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
          <h1 className="text-2xl font-bold text-navy mb-2">Service not found</h1>
          <p className="text-muted mb-6">That page doesn't exist. Here is everything we build.</p>
          <a
            href="/#services"
            className="bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold px-5 py-2.5 rounded-md transition-colors"
          >
            See all services
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function ServicePage() {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (service) document.title = `${service.name} | CodeCraft GH`;
    return () => {
      document.title = "CodeCraft GH | Websites for businesses in Ghana";
    };
  }, [service]);

  if (!service) return <NotFound />;

  const others = SERVICES.filter((s) => s.slug !== service.slug);
  const waText = encodeURIComponent(`Hi CodeCraft GH, I'm interested in ${service.name}.`);

  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <Navbar />
      <main className="pt-16">
        {/* Intro */}
        <section className="px-4 sm:px-6 pt-10 pb-14 lg:pt-14 lg:pb-16">
          <div className="max-w-6xl mx-auto">
            <nav aria-label="Breadcrumb" className="text-sm text-muted mb-8">
              <Link to="/" className="hover:text-ink">Home</Link>
              <span className="mx-2">/</span>
              <a href="/#services" className="hover:text-ink">Services</a>
              <span className="mx-2">/</span>
              <span className="text-ink">{service.name}</span>
            </nav>

            <div className="max-w-3xl">
              <h1 className="text-[2.25rem] leading-[1.1] sm:text-5xl font-bold text-navy tracking-tight mb-5">
                {service.name}
              </h1>
              <p className="text-ink/80 text-lg leading-relaxed mb-8">{service.desc}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#contact"
                  onClick={() => trackClick(`service_${service.slug}_quote_btn`)}
                  className="bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold px-6 py-3 rounded-md transition-colors"
                >
                  Get a quote
                </a>
                <a
                  href={`${WHATSAPP_URL}?text=${waText}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackClick(`service_${service.slug}_whatsapp_btn`)}
                  className="inline-flex items-center gap-2 border border-navy/20 hover:border-navy text-navy font-semibold px-6 py-3 rounded-md transition-colors"
                >
                  <WhatsAppIcon className="w-5 h-5 text-[#25d366]" />
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* What you get / Good for */}
        <section className="bg-paper border-y border-line px-4 sm:px-6 py-14 lg:py-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-navy tracking-tight mb-6">What you get</h2>
              <ul className="divide-y divide-line border-y border-line">
                {service.includes.map((item) => (
                  <li key={item} className="py-3.5 flex gap-3">
                    <span aria-hidden="true" className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0" />
                    <span className="text-ink/85 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-navy tracking-tight mb-6">Good for</h2>
              <ul className="flex flex-col gap-4">
                {service.goodFor.map((item) => (
                  <li key={item} className="border-l-2 border-brand-orange pl-4 text-ink/85 leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="px-4 sm:px-6 py-14 lg:py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-navy tracking-tight mb-8">How it works</h2>
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
              {PROCESS.map((step) => (
                <li key={step.title} className="border-t border-line pt-4">
                  <p className="font-display text-brand-orange-dark font-bold text-sm mb-2">{step.num}</p>
                  <h3 className="text-lg font-bold text-navy mb-1.5">{step.title}</h3>
                  <p className="text-ink/75 leading-relaxed text-[15px]">{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Quote form, with this service preselected */}
        <div className="border-t border-line">
          <Contact
            key={service.slug}
            defaultService={service.name}
            heading={`Get a quote for ${service.name.toLowerCase()}`}
          />
        </div>

        {/* Other services */}
        <section className="bg-paper border-t border-line px-4 sm:px-6 py-14">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold text-navy mb-5">Other services</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 divide-y divide-line sm:divide-y-0">
              {others.map((s) => (
                <li key={s.slug} className="sm:border-t sm:border-line">
                  <Link to={`/services/${s.slug}`} className="group flex items-center justify-between py-3.5">
                    <span className="font-semibold text-navy group-hover:text-brand-orange-dark transition-colors">
                      {s.name}
                    </span>
                    <span aria-hidden="true" className="text-brand-orange-dark">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
