import { SERVICES, INCLUDES } from "../data/constants";

export default function Services() {
  return (
    <section id="services" className="bg-paper border-y border-line py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16">
        <div className="lg:sticky lg:top-24 self-start">
          <h2 className="text-3xl lg:text-4xl font-bold text-navy tracking-tight leading-tight mb-4">
            What we build
          </h2>
          <p className="text-ink/75 leading-relaxed mb-6">
            From a one-page site to a full online store. If what you need is not on
            this list, ask anyway. We will tell you honestly whether we can build it.
          </p>
          <a href="#contact" className="text-brand-orange-dark font-semibold hover:underline underline-offset-4">
            Ask about your project
          </a>
        </div>

        <div>
          <ul className="divide-y divide-line border-y border-line">
            {SERVICES.map((s) => (
              <li key={s.name} className="py-6 grid grid-cols-1 sm:grid-cols-[13rem_1fr] gap-1 sm:gap-6">
                <h3 className="font-semibold text-navy text-lg">{s.name}</h3>
                <p className="text-ink/75 leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <h3 className="text-xl font-bold text-navy mb-5">Every site includes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {INCLUDES.map((item) => (
                <div key={item.title} className="border-l-2 border-brand-orange pl-4">
                  <p className="font-semibold text-navy mb-1">{item.title}</p>
                  <p className="text-ink/70 text-[15px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
