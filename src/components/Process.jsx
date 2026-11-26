import { PROCESS } from "../data/constants";

export default function Process() {
  return (
    <section id="process" className="bg-navy text-white py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight leading-tight mb-3">
            How a project runs
          </h2>
          <p className="text-white/70 leading-relaxed">
            Four steps. You see and approve the design before anything is built.
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {PROCESS.map((step) => (
            <li key={step.title} className="border-t border-white/25 pt-5">
              <p className="font-display text-brand-orange font-bold text-sm mb-3">{step.num}</p>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-white/70 leading-relaxed text-[15px]">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
