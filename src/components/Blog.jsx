import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      setPosts(data || []);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  if (loading) return null;
  if (posts.length === 0) return null;

  const [latest, ...older] = posts;

  return (
    <section id="blog" className="bg-paper border-y border-line py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-navy tracking-tight leading-tight mb-12">
          From the blog
        </h2>

        <Link
          to={`/blog/${latest.id}`}
          className={`group grid grid-cols-1 gap-6 lg:gap-10 items-center ${
            latest.cover_url ? "lg:grid-cols-2" : ""
          }`}
        >
          {latest.cover_url && (
            <div className="aspect-[16/9] rounded-lg overflow-hidden border border-line bg-white">
              <img src={latest.cover_url} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <p className="text-muted text-sm mb-2">{formatDate(latest.created_at)}</p>
            <h3 className="text-2xl lg:text-3xl font-bold text-navy tracking-tight leading-tight mb-3 group-hover:text-brand-orange-dark transition-colors">
              {latest.title}
            </h3>
            <p className="text-ink/75 leading-relaxed line-clamp-3 mb-4">{latest.content}</p>
            <span className="text-brand-orange-dark font-semibold group-hover:underline underline-offset-4">
              Read the post
            </span>
          </div>
        </Link>

        {older.length > 0 && (
          <ul className="mt-14 divide-y divide-line border-y border-line">
            {older.map((post) => (
              <li key={post.id}>
                <Link
                  to={`/blog/${post.id}`}
                  className="group py-4 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8"
                >
                  <span className="text-muted text-sm sm:w-40 flex-shrink-0">{formatDate(post.created_at)}</span>
                  <span className="font-semibold text-navy group-hover:text-brand-orange-dark transition-colors">
                    {post.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
