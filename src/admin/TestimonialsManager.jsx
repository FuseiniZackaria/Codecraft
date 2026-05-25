import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const EMPTY = { name: "", role: "", message: "" };

export default function TestimonialsManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setLoading(true);
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    setItems(data || []);
    setLoading(false);
  }

  function flash(text) {
    setMsg(text);
    setTimeout(() => setMsg(""), 3000);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    if (editing) {
      await supabase.from("testimonials").update(form).eq("id", editing);
      flash("✅ Testimonial updated!");
    } else {
      await supabase.from("testimonials").insert([form]);
      flash("✅ Testimonial added!");
    }
    setSaving(false);
    setForm(EMPTY);
    setEditing(null);
    setShowForm(false);
    fetchItems();
  }

  function handleEdit(item) {
    setForm({ name: item.name, role: item.role, message: item.message });
    setEditing(item.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this testimonial?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    flash("🗑 Testimonial deleted.");
    fetchItems();
  }

  async function toggleApprove(item) {
    await supabase
      .from("testimonials")
      .update({ approved: !item.approved })
      .eq("id", item.id);
    flash(item.approved ? "Testimonial hidden." : "✅ Approved!");
    fetchItems();
  }

  function handleCancel() {
    setForm(EMPTY);
    setEditing(null);
    setShowForm(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0d1f3c] tracking-tight">
            Testimonials
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {items.filter((i) => i.approved).length} approved ·{" "}
            {items.filter((i) => !i.approved).length} pending
          </p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)}
            className="bg-[#f26522] hover:bg-[#ff7a35] text-white font-bold px-5 py-2.5 rounded-full text-sm transition-all">
            + Add Testimonial
          </button>
        )}
      </div>

      {msg && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl mb-5">
          {msg}
        </div>
      )}

      {showForm && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">
          <h2 className="text-[#0d1f3c] font-bold text-base mb-5">
            {editing ? "Edit Testimonial" : "New Testimonial"}
          </h2>
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0d1f3c] uppercase tracking-wider mb-2">
                  Client Name *
                </label>
                <input required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. John Mensah"
                  className="w-full border-2 border-slate-200 focus:border-[#f26522] rounded-xl px-4 py-3 text-sm outline-none bg-slate-50 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#0d1f3c] uppercase tracking-wider mb-2">
                  Role / Business
                </label>
                <input value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="e.g. CEO, ABC Company"
                  className="w-full border-2 border-slate-200 focus:border-[#f26522] rounded-xl px-4 py-3 text-sm outline-none bg-slate-50 transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0d1f3c] uppercase tracking-wider mb-2">
                Message *
              </label>
              <textarea required value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4} placeholder="What did the client say?"
                className="w-full border-2 border-slate-200 focus:border-[#f26522] rounded-xl px-4 py-3 text-sm outline-none bg-slate-50 transition-colors resize-none" />
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving}
                className="bg-[#f26522] hover:bg-[#ff7a35] disabled:opacity-60 text-white font-bold px-6 py-2.5 rounded-full text-sm transition-all">
                {saving ? "Saving..." : editing ? "Update" : "Save"}
              </button>
              <button type="button" onClick={handleCancel}
                className="border-2 border-slate-200 text-slate-600 font-semibold px-6 py-2.5 rounded-full text-sm transition-all">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p className="text-slate-400 text-sm text-center py-10">Loading...</p>
      ) : items.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center">
          <p className="text-4xl mb-3">⭐</p>
          <p className="text-slate-500 font-medium">No testimonials yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-all">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-[#0d1f3c] rounded-full flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0">
                  {item.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-[#0d1f3c] font-bold text-sm">{item.name}</p>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      item.approved
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {item.approved ? "Approved" : "Pending"}
                    </span>
                  </div>
                  {item.role && <p className="text-slate-400 text-xs">{item.role}</p>}
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    "{item.message}"
                  </p>
                </div>
              </div>
              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <button onClick={() => toggleApprove(item)}
                  className={`border-2 text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                    item.approved
                      ? "border-yellow-200 hover:border-yellow-400 text-yellow-600"
                      : "border-green-200 hover:border-green-400 text-green-600"
                  }`}>
                  {item.approved ? "Hide" : "✅ Approve"}
                </button>
                <button onClick={() => handleEdit(item)}
                  className="border-2 border-slate-200 hover:border-[#f26522] hover:text-[#f26522] text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full transition-all">
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)}
                  className="border-2 border-slate-200 hover:border-red-400 hover:text-red-500 text-slate-400 text-xs font-semibold px-3 py-1.5 rounded-full transition-all">
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}