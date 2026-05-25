import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Reveal from "./Reveal";

export default function Portfolio() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      const { data } = await supabase
        .from("portfolio")
        .select("*")
        .order("created_at", { ascending: false });
      setItems(data || []);
      setLoading(false);
    }
    fetchItems();
  }, []);

  if (loading) return null;
  if (items.length === 0) return null;

  return (
    <section id="portfolio" className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Reveal>
            <span className="inline-block bg-[#0d1f3c] text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded mb-4">
              Our Work
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0d1f3c] tracking-tight leading-tight mb-4">
              Projects we've <span className="text-[#f26522]">built</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-slate-500 text-base max-w-md mx-auto leading-relaxed">
              Real websites delivered for real businesses. Here's a sample of
              our work.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={i * 80}>
              <div className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:border-[#f26522] transition-all duration-300">
                {/* Image */}
                <div className="h-48 bg-slate-100 overflow-hidden">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl">
                      🖥️
                    </div>
                  )}
                </div>
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-[#0d1f3c] font-bold text-lg mb-2 leading-tight">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  {item.live_url && (
                    <a
                      href={item.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-[#f26522] hover:bg-[#ff7a35] text-white text-xs font-bold px-4 py-2 rounded-full transition-all"
                    >
                      View Live ↗
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}