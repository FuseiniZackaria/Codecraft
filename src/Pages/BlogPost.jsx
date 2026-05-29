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
            <button onClick={onBack}
              className="inline-flex items-center gap-2 bg-[#f26522] hover:bg-[#ff7a35] text-white font-bold px-6 py-3 rounded-full transition-all">
              ← Back to Blog
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>

    );
}