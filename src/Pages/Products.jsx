import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabase";
import { trackClick } from "../lib/analytics";
import { isValidHttpsUrl, formatPrice } from "../lib/products";

const TITLE = "Digital Products | CodeCraft GH";
const DESCRIPTION =
  "Practical guides and tools from CodeCraft GH that help business owners and professionals in Ghana use AI safely and save time.";

// Set the page title and meta description while this page is open.
function useSeo() {
  useEffect(() => {
    const meta = document.querySelector('meta[name="description"]');
    const prevTitle = document.title;
    const prevDesc = meta?.getAttribute("content");
    document.title = TITLE;
    meta?.setAttribute("content", DESCRIPTION);
    return () => {
      document.title = prevTitle;
      if (meta && prevDesc) meta.setAttribute("content", prevDesc);
    };
  }, []);
}

function ProductCard({ p }) {
  const price = formatPrice(p.price_ghs);
  const canBuy = isValidHttpsUrl(p.selar_url);

  return (
    <article className="border border-line rounded-lg overflow-hidden bg-white flex flex-col">
      <div className="aspect-[4/3] bg-paper border-b border-line">
        {p.image_url ? (
          <img src={p.image_url} alt={`Cover of ${p.name}`} loading="lazy" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center px-6 text-center">
            <span className="font-display text-navy/70 text-2xl font-bold">{p.name}</span>
          </div>
        )}
      </div>
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <h2 className="text-xl font-bold text-navy tracking-tight mb-1.5">{p.name}</h2>
        {p.description && <p className="text-ink/75 leading-relaxed mb-5">{p.description}</p>}
        <div className="mt-auto flex items-center justify-between gap-4 pt-2">
          <span className="font-display text-navy text-lg font-bold">{price}</span>
          {canBuy ? (
            <a
              href={p.selar_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick(`product_buy_${p.name}`)}
              className="bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold px-5 py-2.5 rounded-md transition-colors"
            >
              Buy now
            </a>
          ) : (
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="bg-line text-muted font-semibold px-5 py-2.5 rounded-md cursor-not-allowed"
            >
              Coming soon
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  useSeo();

  useEffect(() => {
    window.scrollTo({ top: 0 });
    async function load() {
      const { data, error } = await supabase
        .from("digital_products")
        .select("id, name, description, price_ghs, image_url, selar_url, sort_order")
        .eq("visible", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (error) setFailed(true);
      setProducts(data || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <Navbar />
      <main className="pt-16">
        <section className="px-4 sm:px-6 pt-12 pb-10 lg:pt-16 lg:pb-12">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-[2.25rem] leading-[1.1] sm:text-5xl font-bold text-navy tracking-tight mb-4">
              Digital products
            </h1>
            <p className="text-ink/80 text-lg leading-relaxed max-w-2xl">
              Practical guides and tools that help business owners and professionals
              use AI safely and save time. Payment is handled securely by Selar, and
              you get your download straight after buying.
            </p>
          </div>
        </section>

        <section className="px-4 sm:px-6 pb-20 lg:pb-24">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <p className="text-muted py-10">Loading products…</p>
            ) : failed ? (
              <p className="text-muted py-10">
                Products could not be loaded right now. Please refresh the page.
              </p>
            ) : products.length === 0 ? (
              <div className="border border-dashed border-line rounded-lg px-6 py-14 text-center">
                <p className="font-semibold text-navy mb-1">No products yet</p>
                <p className="text-muted">
                  The first guides are being prepared. Check back soon, or{" "}
                  <a href="/#contact" className="text-brand-orange-dark font-semibold hover:underline underline-offset-4">
                    contact us
                  </a>{" "}
                  to be told when they are ready.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {products.map((p) => (
                  <ProductCard key={p.id} p={p} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
