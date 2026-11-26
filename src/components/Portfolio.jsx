import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function ProjectImage({ item, className = "" }) {
  if (item.image_url) {
    return (
      <img
        src={item.image_url}
        alt={`Screenshot of ${item.title}`}
        loading="lazy"
        className={`w-full h-full object-cover object-top ${className}`}
      />
    );
  }
  return (
    <div className={`w-full h-full bg-paper flex items-center justify-center text-muted text-sm ${className}`}>
      No screenshot yet
    </div>
  );
}

function LiveLink({ url }) {
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-block text-brand-orange-dark font-semibold hover:underline underline-offset-4"
    >
      Visit the live site ↗
    </a>
  );
}

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

  const featured = items.slice(0, 3);
  const rest = items.slice(3);

  return (
    <section id="portfolio" className="bg-white py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-navy tracking-tight leading-tight mb-3">
            Recent work
          </h2>
          <p className="text-ink/75 leading-relaxed">
            Websites we have built for real businesses.
          </p>
        </div>

        <div className="flex flex-col gap-16 lg:gap-20">
          {featured.map((item, i) => (
            <article
              key={item.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center"
            >
              <div
                className={`lg:col-span-7 aspect-[16/10] rounded-lg overflow-hidden border border-line ${
                  i % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <ProjectImage item={item} />
              </div>
              <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <h3 className="text-2xl font-bold text-navy tracking-tight mb-3">{item.title}</h3>
                {item.description && (
                  <p className="text-ink/75 leading-relaxed mb-5">{item.description}</p>
                )}
                <LiveLink url={item.live_url} />
              </div>
            </article>
          ))}
        </div>

        {rest.length > 0 && (
          <div className="mt-20">
            <h3 className="text-lg font-bold text-navy mb-4">More projects</h3>
            <ul className="divide-y divide-line border-y border-line">
              {rest.map((item) => (
                <li key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                  <div className="w-full sm:w-28 aspect-[16/10] rounded overflow-hidden border border-line flex-shrink-0">
                    <ProjectImage item={item} className="text-xs" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-navy">{item.title}</p>
                    {item.description && (
                      <p className="text-ink/70 text-[15px] line-clamp-1">{item.description}</p>
                    )}
                  </div>
                  <LiveLink url={item.live_url} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
