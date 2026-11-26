import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

// Some messages are saved with their own quote marks; strip them so we
// don't show doubled quotes.
const clean = (msg = "") => msg.trim().replace(/^["“”']+|["“”']+$/g, "").trim();

function Attribution({ t }) {
  return (
    <p className="text-[15px]">
      <span className="font-semibold text-navy">{t.name}</span>
      {t.role && <span className="text-muted">, {t.role}</span>}
    </p>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      const { data } = await supabase
        .from("testimonials")
        .select("*")
        .eq("approved", true)
        .order("created_at", { ascending: false });
      setTestimonials(data || []);
      setLoading(false);
    }
    fetchTestimonials();
  }, []);

  if (loading) return null;
  if (testimonials.length === 0) return null;

  const [lead, ...others] = testimonials;

  return (
    <section id="testimonials" className="bg-white py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-navy tracking-tight leading-tight mb-12">
          What clients said
        </h2>

        <div className={`grid grid-cols-1 gap-12 ${others.length ? "lg:grid-cols-[1.4fr_1fr] lg:gap-16" : ""}`}>
          <figure className="border-l-4 border-brand-orange pl-6">
            <blockquote className="font-display text-navy text-2xl lg:text-[1.75rem] leading-snug font-semibold mb-5">
              “{clean(lead.message)}”
            </blockquote>
            <figcaption>
              <Attribution t={lead} />
            </figcaption>
          </figure>

          {others.length > 0 && (
            <div className="divide-y divide-line border-y border-line">
              {others.map((t) => (
                <figure key={t.id} className="py-5">
                  <blockquote className="text-ink/80 leading-relaxed mb-3">“{clean(t.message)}”</blockquote>
                  <figcaption>
                    <Attribution t={t} />
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
