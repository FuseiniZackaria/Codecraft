import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Reveal from "./Reveal";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  return (
    <section id="blog" className="bg-slate-50 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Reveal>
            <span className="inline-block bg-[#0d1f3c] text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded mb-4">
              Blog
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0d1f3c] tracking-tight leading-tight">
              Tips & <span className="text-[#f26522]">Insights</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 80}>
              <div
                onClick={() => navigate(`/blog/${post.id}`)}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                {/* Cover Image */}
                <div className="h-48 bg-slate-100 overflow-hidden">
                  {post.cover_url ? (
                    <img
                      src={post.cover_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300 text-5xl">
                      📝
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-xs text-slate-400 mb-2">
                    {new Date(post.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <h3 className="text-[#0d1f3c] font-bold text-lg mb-3 leading-tight group-hover:text-[#f26522] transition-colors">
                    {post.title}
                  </h3>
                   
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-4">
                    {post.content}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[#f26522] font-bold text-sm group-hover:gap-2 transition-all">
                    Read More →
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}