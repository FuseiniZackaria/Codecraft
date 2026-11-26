import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { WhatsAppIcon, FacebookIcon, XIcon, LinkIcon } from "../components/Icons";

const shareClass =
  "w-10 h-10 border border-line hover:border-navy rounded-md flex items-center justify-center text-navy transition-colors";

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();
      setPost(data);
      setLoading(false);
    }
    fetchPost();
    window.scrollTo({ top: 0 });
  }, [id]);

  const goBack = () => navigate("/");

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-muted text-sm">Loading post…</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-navy mb-2">Post not found</h1>
          <p className="text-muted mb-6">It may have been removed or the link is wrong.</p>
          <button
            onClick={goBack}
            className="bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold px-5 py-2.5 rounded-md transition-colors"
          >
            Back to the homepage
          </button>
        </div>
      </div>
    );
  }

  const postUrl = window.location.href;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt("Copy this link:", postUrl);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <Navbar />
      <main className="pt-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
          <button
            onClick={goBack}
            className="text-muted hover:text-ink text-sm mb-8 transition-colors"
          >
            ← Back to the homepage
          </button>

          <p className="text-muted text-sm mb-3">
            {new Date(post.created_at).toLocaleDateString("en-GB", {
              day: "numeric", month: "long", year: "numeric",
            })}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy tracking-tight leading-tight mb-8">
            {post.title}
          </h1>

          {post.cover_url && (
            <div className="rounded-lg overflow-hidden border border-line mb-10 aspect-[16/9]">
              <img src={post.cover_url} alt="" className="w-full h-full object-cover" />
            </div>
          )}

          <div>
            {(post.content || "").split("\n").map((paragraph, i) =>
              paragraph.trim() ? (
                <p key={i} className="text-ink/85 leading-relaxed mb-5 text-[17px] lg:text-lg">
                  {paragraph}
                </p>
              ) : null
            )}
          </div>

          <div className="mt-12 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-muted text-sm mr-1">Share</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(post.title + " - " + postUrl)}`}
                target="_blank" rel="noreferrer" aria-label="Share on WhatsApp" className={shareClass}
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
                target="_blank" rel="noreferrer" aria-label="Share on Facebook" className={shareClass}
              >
                <FacebookIcon />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
                target="_blank" rel="noreferrer" aria-label="Share on X" className={shareClass}
              >
                <XIcon />
              </a>
              <button onClick={copyLink} aria-label="Copy link (for Instagram)" className={shareClass}>
                <LinkIcon />
              </button>
              {copied && (
                <span role="status" className="text-sm text-muted ml-1">
                  Link copied. Paste it in your Instagram bio or story.
                </span>
              )}
            </div>
            <button
              onClick={goBack}
              className="border border-navy/20 hover:border-navy text-navy font-semibold px-5 py-2.5 rounded-md transition-colors"
            >
              More from CodeCraft
            </button>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
