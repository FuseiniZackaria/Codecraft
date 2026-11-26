import { useState } from "react";
import { SERVICES, CONTACT_METHODS } from "../data/constants";
import { WhatsAppIcon, PhoneIcon } from "./Icons";

const INITIAL_FORM = { name: "", phone: "", service: "", message: "" };

const fieldClass =
  "w-full border border-line focus:border-navy focus:ring-2 focus:ring-navy/10 rounded-md px-3.5 py-2.5 text-[15px] outline-none bg-white transition-colors";
const labelClass = "block text-sm font-medium text-navy mb-1.5";

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
    <section id="contact" className="bg-white py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy tracking-tight leading-tight mb-4">
            Tell us about your project
          </h2>
          <p className="text-ink/75 leading-relaxed mb-8 max-w-md">
            Message us on WhatsApp, call, or fill in the form. We reply within 24
            hours with a plan and a clear quote.
          </p>

          <ul className="flex flex-col gap-3 max-w-sm">
            {CONTACT_METHODS.map(({ type, label, value, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={type === "whatsapp" ? "_blank" : undefined}
                  rel={type === "whatsapp" ? "noreferrer" : undefined}
                  className="flex items-center gap-4 border border-line rounded-md px-4 py-3 hover:border-navy transition-colors"
                >
                  <span
                    className={`w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 ${
                      type === "whatsapp" ? "bg-[#25d366] text-white" : "bg-navy text-white"
                    }`}
                  >
                    {type === "whatsapp" ? <WhatsAppIcon /> : <PhoneIcon />}
                  </span>
                  <span>
                    <span className="block text-muted text-sm">{label}</span>
                    <span className="block font-display text-navy font-bold text-lg">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-line rounded-lg p-6 sm:p-8 bg-paper">
          <h3 className="text-xl font-bold text-navy mb-6">Get a free quote</h3>

          {sent && (
            <div role="status" className="bg-green-50 border border-green-200 text-green-800 text-sm px-4 py-3 rounded-md mb-6">
              Message sent. We will get back to you within 24 hours.
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="c-name" className={labelClass}>Your name</label>
                <input
                  id="c-name"
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. John Mensah"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="c-phone" className={labelClass}>Phone or WhatsApp</label>
                <input
                  id="c-phone"
                  required
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  type="tel"
                  autoComplete="tel"
                  placeholder="e.g. 0244000000"
                  className={fieldClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="c-service" className={labelClass}>Service needed</label>
              <select
                id="c-service"
                required
                name="service"
                value={form.service}
                onChange={handleChange}
                className={fieldClass}
              >
                <option value="">Select a service</option>
                {SERVICES.map((s) => (
                  <option key={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="c-message" className={labelClass}>What do you need?</label>
              <textarea
                id="c-message"
                required
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                maxLength={4000}
                placeholder="A few lines about your business and what the site should do"
                className={`${fieldClass} resize-y`}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold py-3 rounded-md transition-colors"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
