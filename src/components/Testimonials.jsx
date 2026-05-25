import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Reveal from "./Reveal";

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

  return (
    <section id="testimonials" className="bg-slate-50 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Reveal>
            <span className="inline-block bg-[#0d1f3c] text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded mb-4">
              Testimonials
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0d1f3c] tracking-tight leading-tight mb-4">
              What our <span className="text-[#f26522]">clients say</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-slate-500 text-base max-w-md mx-auto leading-relaxed">
              Don't take our word for it — hear from the businesses we've
              helped grow online.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 80}>
              <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg hover:border-[#f26522]/30 transition-all duration-300 flex flex-col h-full">
                <div className="text-[#f26522] text-lg mb-4">★★★★★</div>
                <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-6">
                  "{t.message}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 bg-[#0d1f3c] rounded-full flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0">
                    {t.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-[#0d1f3c] font-bold text-sm">{t.name}</p>
                    {t.role && (
                      <p className="text-slate-400 text-xs">{t.role}</p>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}