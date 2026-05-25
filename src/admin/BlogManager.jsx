import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const EMPTY = { title: "", content: "", cover_url: "", published: false };

export default function BlogManager() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => { fetchPosts(); }, []);

  async function fetchPosts() {
    setLoading(true);
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    setPosts(data || []);
    setLoading(false);
  }

  function flash(text) {
    setMsg(text);
    setTimeout(() => setMsg(""), 3000);
  }

  // ── Upload image from computer ──
  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("images")
      .upload(fileName, file);
    if (error) {
      flash("❌ Upload failed: " + error.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage
      .from("images")
      .getPublicUrl(fileName);
    setForm((prev) => ({ ...prev, cover_url: data.publicUrl }));
    flash("✅ Image uploaded!");
    setUploading(false);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    if (editing) {
      await supabase.from("posts").update(form).eq("id", editing);
      flash("✅ Post updated!");
    } else {
      await supabase.from("posts").insert([form]);
      flash("✅ Post created!");
    }
    setSaving(false);
    setForm(EMPTY);
    setEditing(null);
    setShowForm(false);
    fetchPosts();
  }

  function handleEdit(post) {
    setForm({
      title: post.title,
      content: post.content,
      cover_url: post.cover_url,
      published: post.published,
    });
    setEditing(post.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this post?")) return;
    await supabase.from("posts").delete().eq("id", id);
    flash("🗑 Post deleted.");
    fetchPosts();
  }

  async function togglePublish(post) {
    await supabase
      .from("posts")
      .update({ published: !post.published })
      .eq("id", post.id);
    flash(post.published ? "Post unpublished." : "✅ Post published!");
    fetchPosts();
  }

  function handleCancel() {
    setForm(EMPTY);
    setEditing(null);
    setShowForm(false);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0d1f3c] tracking-tight">
            Blog Posts
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {posts.filter((p) => p.published).length} published ·{" "}
            {posts.filter((p) => !p.published).length} drafts
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#f26522] hover:bg-[#ff7a35] text-white font-bold px-5 py-2.5 rounded-full text-sm transition-all"
          >
            + New Post
          </button>
        )}
      </div>

      {msg && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl mb-5">
          {msg}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">
          <h2 className="text-[#0d1f3c] font-bold text-base mb-5">
            {editing ? "Edit Post" : "New Post"}
          </h2>
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0d1f3c] uppercase tracking-wider mb-2">
                Post Title *
              </label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. How to choose a web designer"
                className="w-full border-2 border-slate-200 focus:border-[#f26522] rounded-xl px-4 py-3 text-sm outline-none bg-slate-50 transition-colors"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-xs font-bold text-[#0d1f3c] uppercase tracking-wider mb-2">
                Cover Image
              </label>
              {/* Preview */}
              {form.cover_url && (
                <div className="mb-3 relative w-full h-40 rounded-xl overflow-hidden border border-slate-200">
                  <img
                    src={form.cover_url}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, cover_url: "" })}
                    className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
                  >
                    Remove
                  </button>
                </div>
              )}
              {/* Upload button */}
              <label className={`flex items-center justify-center gap-2 border-2 border-dashed rounded-xl px-4 py-4 cursor-pointer transition-all
                ${uploading
                  ? "border-slate-200 bg-slate-50 text-slate-400"
                  : "border-[#f26522]/40 hover:border-[#f26522] hover:bg-orange-50 text-[#f26522]"
                }`}>
                <span className="text-lg">{uploading ? "⏳" : "📁"}</span>
                <span className="text-sm font-semibold">
                  {uploading ? "Uploading..." : "Select image from computer"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-slate-400 mt-1">
                Or paste a URL directly:
              </p>
              <input
                value={form.cover_url}
                onChange={(e) => setForm({ ...form, cover_url: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="w-full border-2 border-slate-200 focus:border-[#f26522] rounded-xl px-4 py-3 text-sm outline-none bg-slate-50 transition-colors mt-1"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0d1f3c] uppercase tracking-wider mb-2">
                Content *
              </label>
              <textarea
                required
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={8}
                placeholder="Write your blog post content here..."
                className="w-full border-2 border-slate-200 focus:border-[#f26522] rounded-xl px-4 py-3 text-sm outline-none bg-slate-50 transition-colors resize-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="published"
                checked={form.published}
                onChange={(e) =>
                  setForm({ ...form, published: e.target.checked })
                }
                className="w-4 h-4 accent-[#f26522]"
              />
              <label
                htmlFor="published"
                className="text-sm font-medium text-[#0d1f3c]"
              >
                Publish immediately
              </label>
            </div>

            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                disabled={saving || uploading}
                className="bg-[#f26522] hover:bg-[#ff7a35] disabled:opacity-60 text-white font-bold px-6 py-2.5 rounded-full text-sm transition-all"
              >
                {saving ? "Saving..." : editing ? "Update Post" : "Save Post"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="border-2 border-slate-200 hover:border-slate-400 text-slate-600 font-semibold px-6 py-2.5 rounded-full text-sm transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Posts List */}
      {loading ? (
        <div className="text-slate-400 text-sm py-10 text-center">
          Loading posts...
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center">
          <p className="text-4xl mb-3">📝</p>
          <p className="text-slate-500 font-medium">
            No posts yet. Write your first one!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 flex gap-4 items-start hover:shadow-md transition-all"
            >
              <div className="w-20 h-16 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                {post.cover_url ? (
                  <img
                    src={post.cover_url}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300 text-2xl">
                    📝
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-[#0d1f3c] font-bold text-sm truncate">
                    {post.title}
                  </h3>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                      post.published
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-slate-400 text-xs line-clamp-1 mb-3">
                  {post.content?.substring(0, 120)}...
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="border-2 border-slate-200 hover:border-[#f26522] hover:text-[#f26522] text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => togglePublish(post)}
                    className={`border-2 text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                      post.published
                        ? "border-slate-200 hover:border-yellow-400 hover:text-yellow-600 text-slate-600"
                        : "border-green-200 hover:border-green-400 text-green-600"
                    }`}
                  >
                    {post.published ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="border-2 border-slate-200 hover:border-red-400 hover:text-red-500 text-slate-400 text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
                  >
                    🗑
                  </button>
                </div>
              </div>
              <p className="text-slate-300 text-xs flex-shrink-0">
                {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}