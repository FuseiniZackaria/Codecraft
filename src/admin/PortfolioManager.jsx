import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const EMPTY = { title: "", description: "", image_url: "", live_url: "" };

export default function PortfolioManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setLoading(true);
    const { data } = await supabase
      .from("portfolio")
      .select("*")
      .order("created_at", { ascending: false });
    setItems(data || []);
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
    setForm((prev) => ({ ...prev, image_url: data.publicUrl }));
    flash("✅ Image uploaded!");
    setUploading(false);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    if (editing) {
      await supabase.from("portfolio").update(form).eq("id", editing);
      flash("✅ Project updated!");
    } else {
      await supabase.from("portfolio").insert([form]);
      flash("✅ Project added!");
    }
    setSaving(false);
    setForm(EMPTY);
    setEditing(null);
    setShowForm(false);
    fetchItems();
  }

  function handleEdit(item) {
    setForm({
      title: item.title,
      description: item.description,
      image_url: item.image_url,
      live_url: item.live_url,
    });
    setEditing(item.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this project?")) return;
    await supabase.from("portfolio").delete().eq("id", id);
    flash("🗑 Project deleted.");
    fetchItems();
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
            Portfolio
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {items.length} project{items.length !== 1 ? "s" : ""}
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#f26522] hover:bg-[#ff7a35] text-white font-bold px-5 py-2.5 rounded-full text-sm transition-all"
          >
            + Add Project
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
            {editing ? "Edit Project" : "New Project"}
          </h2>
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0d1f3c] uppercase tracking-wider mb-2">
                  Project Title *
                </label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. ABC Company Website"
                  className="w-full border-2 border-slate-200 focus:border-[#f26522] rounded-xl px-4 py-3 text-sm outline-none bg-slate-50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#0d1f3c] uppercase tracking-wider mb-2">
                  Live URL
                </label>
                <input
                  value={form.live_url}
                  onChange={(e) => setForm({ ...form, live_url: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full border-2 border-slate-200 focus:border-[#f26522] rounded-xl px-4 py-3 text-sm outline-none bg-slate-50 transition-colors"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-xs font-bold text-[#0d1f3c] uppercase tracking-wider mb-2">
                Project Image
              </label>
              {/* Preview */}
              {form.image_url && (
                <div className="mb-3 relative w-full h-40 rounded-xl overflow-hidden border border-slate-200">
                  <img
                    src={form.image_url}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, image_url: "" })}
                    className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
                  >
                    Remove
                  </button>
                </div>
              )}
              {/* Upload button */}
              <label
                className={`flex items-center justify-center gap-2 border-2 border-dashed rounded-xl px-4 py-4 cursor-pointer transition-all
                ${uploading
                  ? "border-slate-200 bg-slate-50 text-slate-400"
                  : "border-[#f26522]/40 hover:border-[#f26522] hover:bg-orange-50 text-[#f26522]"
                }`}
              >
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
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                placeholder="https://example.com/screenshot.png"
                className="w-full border-2 border-slate-200 focus:border-[#f26522] rounded-xl px-4 py-3 text-sm outline-none bg-slate-50 transition-colors mt-1"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0d1f3c] uppercase tracking-wider mb-2">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                placeholder="Brief description of the project..."
                className="w-full border-2 border-slate-200 focus:border-[#f26522] rounded-xl px-4 py-3 text-sm outline-none bg-slate-50 transition-colors resize-none"
              />
            </div>

            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                disabled={saving || uploading}
                className="bg-[#f26522] hover:bg-[#ff7a35] disabled:opacity-60 text-white font-bold px-6 py-2.5 rounded-full text-sm transition-all"
              >
                {saving ? "Saving..." : editing ? "Update Project" : "Save Project"}
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

      {/* Items Grid */}
      {loading ? (
        <div className="text-slate-400 text-sm py-10 text-center">
          Loading projects...
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center">
          <p className="text-4xl mb-3">🖼</p>
          <p className="text-slate-500 font-medium">
            No projects yet. Add your first one!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden group hover:shadow-lg transition-all"
            >
              <div className="h-40 bg-slate-100 overflow-hidden">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300 text-4xl">
                    🖼
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-[#0d1f3c] font-bold text-sm mb-1 truncate">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs line-clamp-2 mb-4">
                  {item.description || "No description."}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 border-2 border-slate-200 hover:border-[#f26522] hover:text-[#f26522] text-slate-600 text-xs font-semibold py-2 rounded-full transition-all"
                  >
                    Edit
                  </button>
                  {item.live_url && (
                    <a
                      href={item.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 border-2 border-slate-200 hover:border-blue-400 hover:text-blue-500 text-slate-600 text-xs font-semibold py-2 rounded-full transition-all text-center"
                    >
                      View ↗
                    </a>
                  )}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="border-2 border-slate-200 hover:border-red-400 hover:text-red-500 text-slate-400 text-xs font-semibold px-3 py-2 rounded-full transition-all"
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}