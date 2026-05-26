import { useState } from "react";
import { SERVICES, CONTACT_METHODS } from "../data/constants";
import Reveal from "./Reveal";

const INITIAL_FORM = { name: "", phone: "", service: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await fetch("https://formspree.io/f/xpqnjzro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  if (res.ok) {
    setSent(true);
    setForm(INITIAL_FORM);
    setTimeout(() => setSent(false), 4000);
  }
};

  return (
    <section id="contact" className="bg-[#0d1f3c] py-24 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        {/* Left — Info */}
        <div>
          <Reveal>
            <span className="inline-block bg-[#f26522] text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded mb-6">
              Contact Us
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Let's start your
              <br />
              <span className="text-[#f26522]">project today.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-white/60 text-sm leading-relaxed mb-10">
              Reach out via WhatsApp or fill the form. We reply within 24 hours
              with a clear plan and transparent quote.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="flex flex-col gap-4">
              {CONTACT_METHODS.map(({ icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 hover:border-[#f26522]/50 transition-colors"
                >
                  <div className="w-11 h-11 bg-[#f26522] rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-0.5">
                      {label}
                    </p>
                    <p className="text-white font-bold text-lg tracking-tight">
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right — Form */}
        <Reveal delay={200}>
          <div className="bg-white rounded-2xl p-10 shadow-2xl">
            <h3 className="text-[#0d1f3c] font-extrabold text-xl mb-7 tracking-tight">
              Get a Free Quote
            </h3>

            {sent && (
              <div className="bg-green-50 border border-green-200 text-green-700 text-sm font-medium px-4 py-3 rounded-xl mb-6">
                ✅ Message sent! We'll contact you within 24 hours.
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0d1f3c] uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="e.g. John Mensah"
                    className="w-full border-2 border-slate-200 focus:border-[#f26522] rounded-xl px-4 py-3 text-sm outline-none bg-slate-50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0d1f3c] uppercase tracking-wider mb-2">
                    Phone / WhatsApp
                  </label>
                  <input
                    required
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    type="tel"
                    placeholder="e.g. 0244000000"
                    className="w-full border-2 border-slate-200 focus:border-[#f26522] rounded-xl px-4 py-3 text-sm outline-none bg-slate-50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0d1f3c] uppercase tracking-wider mb-2">
                  Service Needed
                </label>
                <select
                  required
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="w-full border-2 border-slate-200 focus:border-[#f26522] rounded-xl px-4 py-3 text-sm outline-none bg-slate-50 transition-colors appearance-none"
                >
                  <option value="">Select a service...</option>
                  {SERVICES.map((s) => (
                    <option key={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0d1f3c] uppercase tracking-wider mb-2">
                  Tell us about your project
                </label>
                <textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={200}
                  placeholder="Briefly describe what you need..."
                  className="w-full border-2 border-slate-200 focus:border-[#f26522] rounded-xl px-4 py-3 text-sm outline-none bg-slate-50 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#f26522] hover:bg-[#ff7a35] text-white font-bold text-base py-4 rounded-full transition-all hover:-translate-y-0.5 shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
              >
                Send Message →
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
