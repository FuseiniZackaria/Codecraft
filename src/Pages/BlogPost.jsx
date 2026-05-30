import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BlogPost({postId, onBack}) {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPost() {
            const {data} = await supabase.from("posts").select("*").eq("id", postId).single();
            setPost(data);
            setLoading(false);
        }
        fetchPost();
        //scroll to top of page
        window.scrollTo({ top: 0, behavior: "smooth" });
    
    }, [postId]);

    if (loading) {
        return( <div className="min-h-screen bg-white dark:bg-[#0a0f1e] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#f26522] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 text-sm">Loading post...</p>
        </div>
      </div>
        );
    }


    if (!post) {
        return (
             <div className="min-h-screen bg-white dark:bg-[#0a0f1e] flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">😕</p>
          <p className="text-slate-500 mb-6">Post not found.</p>
          <button onClick={onBack}
            className="bg-[#f26522] text-white font-bold px-6 py-3 rounded-full">
            ← Go Back
          </button>
        </div>
      </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0f1e]">
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <div className="bg-[#0d1f3c] py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <button onClick={onBack}
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-8 transition-colors">
              ← Back to Blog
            </button>
            <div className="inline-block bg-[#f26522] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
              Blog
            </div>
            <h1 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-white/50 text-sm">
              {new Date(post.created_at).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Cover Image */}
        {post.cover_url && (
          <div className="max-w-3xl mx-auto px-6 -mt-8">
            <div className="rounded-2xl overflow-hidden shadow-2xl h-64 lg:h-96">
              <img
                src={post.cover_url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="prose prose-lg max-w-none">
            {post.content.split("\n").map((paragraph, i) =>
              paragraph.trim() ? (
                <p key={i} className="text-slate-700 dark:text-slate-300 leading-relaxed mb-5 text-base lg:text-lg">
                  {paragraph}
                </p>
              ) : (
                <br key={i} />
              )
            )}
          </div>

          {/* Back button */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/10">
  <div className="flex flex-wrap items-center justify-between gap-4">
    {/* Back button */}
    <button onClick={onBack}
      className="inline-flex items-center gap-2 bg-[#f26522] hover:bg-[#ff7a35] text-white font-bold px-6 py-3 rounded-full transition-all">
      ← Back to Blog
    </button>

    {/* Share buttons */}
    <div className="flex items-center gap-3">
      <span className="text-slate-400 text-sm font-medium">Share:</span>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${encodeURIComponent(post.title + " - " + window.location.href)}`}
        target="_blank"
        rel="noreferrer"
        className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white transition-all hover:-translate-y-0.5"
        title="Share on WhatsApp"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.558 4.121 1.533 5.851L.057 23.985l6.304-1.654A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.001-1.369l-.36-.214-3.716.975.99-3.618-.235-.372A9.818 9.818 0 1112 21.818z"/>
        </svg>
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
        target="_blank"
        rel="noreferrer"
        className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-all hover:-translate-y-0.5"
        title="Share on Facebook"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </a>

      {/* Twitter / X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
        target="_blank"
        rel="noreferrer"
        className="w-10 h-10 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center text-white transition-all hover:-translate-y-0.5"
        title="Share on X"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </a>

      {/* Copy Link */}
      <button
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          alert("Link copied to clipboard!");
        }}
        className="w-10 h-10 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 rounded-full flex items-center justify-center text-slate-600 dark:text-white transition-all hover:-translate-y-0.5"
        title="Copy link"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2M16 8h2a2 2 0 012 2v8a2 2 0 01-2 2h-8a2 2 0 01-2-2v-2"/>
        </svg>
      </button>
    </div>
  </div>
</div>
          </div>
      </main>
      <Footer />
    </div>

    );
}