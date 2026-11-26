import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { isValidHttpsUrl, formatPrice } from "../lib/products";

const EMPTY = {
  name: "",
  description: "",
  price_ghs: "",
  image_url: "",
  selar_url: "",
  visible: false,
  sort_order: "",
};

const inputClass =
  "w-full border-2 border-slate-200 focus:border-[#f26522] rounded-xl px-4 py-3 text-sm outline-none bg-slate-50 transition-colors";
const labelClass = "block text-xs font-bold text-[#0d1f3c] uppercase tracking-wider mb-2";

function status(p) {
  if (!p.visible) return { label: "Hidden", cls: "bg-slate-100 text-slate-500" };
  if (!p.selar_url) return { label: "Coming soon", cls: "bg-amber-100 text-amber-700" };
  return { label: "Live", cls: "bg-green-100 text-green-700" };
}

export default function ProductsManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);
  const flashTimer = useRef(null);

  useEffect(() => { fetchItems(); }, []);

  // Only the first load shows "Loading..."; refreshes after an action keep
  // the current list on screen until the new one arrives.
  async function fetchItems() {
    const { data, error } = await supabase
      .from("digital_products")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) setError("Could not load products: " + error.message);
    setItems(data || []);
    setLoading(false);
  }

  // Restart the timer on each message so an older timer can't clear a newer one.
  function flash(text) {
    clearTimeout(flashTimer.current);
    setMsg(text);
    flashTimer.current = setTimeout(() => setMsg(""), 4000);
  }
  useEffect(() => () => clearTimeout(flashTimer.current), []);

  // Same upload method as Portfolio: Supabase storage bucket "images".
  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const fileName = `products/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error } = await supabase.storage.from("images").upload(fileName, file);
    if (error) {
      setError("Upload failed: " + error.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("images").getPublicUrl(fileName);
    setForm((prev) => ({ ...prev, image_url: data.publicUrl }));
    flash("Image uploaded.");
    setUploading(false);
  }

  function validate() {
    if (!form.name.trim()) return "Name is required.";
    const selar = form.selar_url.trim();
    if (selar && !isValidHttpsUrl(selar)) {
      return "Selar link must be a full https link, e.g. https://selar.com/abc123";
    }
    if (form.price_ghs !== "" && (Number.isNaN(Number(form.price_ghs)) || Number(form.price_ghs) < 0)) {
      return "Price must be a number of 0 or more.";
    }
    if (form.sort_order !== "" && !Number.isInteger(Number(form.sort_order))) {
      return "Display order must be a whole number.";
    }
    return "";
  }

  async function handleSave(e) {
    e.preventDefault();
    const problem = validate();
    if (problem) {
      setError(problem);
      return;
    }
    setError("");
    setSaving(true);

    const nextOrder = items.length ? Math.max(...items.map((i) => i.sort_order)) + 1 : 1;
    const payload = {
      name: form.name.trim(),
      description: form.description.trim() || null,
      price_ghs: form.price_ghs === "" ? null : Number(form.price_ghs),
      image_url: form.image_url.trim() || null,
      selar_url: form.selar_url.trim() || null,
      visible: form.visible,
      sort_order: form.sort_order === "" ? (editing ? 0 : nextOrder) : Number(form.sort_order),
    };

    const { error } = editing
      ? await supabase.from("digital_products").update(payload).eq("id", editing)
      : await supabase.from("digital_products").insert([payload]);

    setSaving(false);
    if (error) {
      setError("Save failed: " + error.message);
      return;
    }
    flash(editing ? "Product updated." : "Product added.");
    setForm(EMPTY);
    setEditing(null);
    setShowForm(false);
    fetchItems();
  }

  function handleEdit(item) {
    setForm({
      name: item.name || "",
      description: item.description || "",
      price_ghs: item.price_ghs ?? "",
      image_url: item.image_url || "",
      selar_url: item.selar_url || "",
      visible: !!item.visible,
      sort_order: item.sort_order ?? "",
    });
    setEditing(item.id);
    setError("");
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function toggleVisible(item) {
    setBusyId(item.id);
    const { error } = await supabase
      .from("digital_products")
      .update({ visible: !item.visible })
      .eq("id", item.id);
    setBusyId(null);
    if (error) return setError("Could not change visibility: " + error.message);
    flash(item.visible ? `"${item.name}" is now hidden.` : `"${item.name}" is now visible.`);
    fetchItems();
  }

  // Swap display order with the neighbour above/below.
  async function move(index, dir) {
    const a = items[index];
    const b = items[index + dir];
    if (!a || !b) return;
    setBusyId(a.id);
    // If both share the same number, spread them so the swap is visible.
    const aOrder = a.sort_order === b.sort_order ? b.sort_order + dir : b.sort_order;
    const results = await Promise.all([
      supabase.from("digital_products").update({ sort_order: aOrder }).eq("id", a.id),
      supabase.from("digital_products").update({ sort_order: a.sort_order }).eq("id", b.id),
    ]);
    setBusyId(null);
    const failed = results.find((r) => r.error);
    if (failed) return setError("Could not reorder: " + failed.error.message);
    fetchItems();
  }

  async function handleDelete(item) {
    if (!window.confirm(`Delete "${item.name}"? This cannot be undone.`)) return;
    setBusyId(item.id);
    const { error } = await supabase.from("digital_products").delete().eq("id", item.id);
    setBusyId(null);
    if (error) return setError("Delete failed: " + error.message);
    flash(`"${item.name}" deleted.`);
    fetchItems();
  }

  function handleCancel() {
    setForm(EMPTY);
    setEditing(null);
    setError("");
    setShowForm(false);
  }

  const selarInvalid = form.selar_url.trim() !== "" && !isValidHttpsUrl(form.selar_url);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0d1f3c] tracking-tight">Products</h1>
          <p className="text-slate-400 text-sm mt-1">
            {items.length} product{items.length !== 1 ? "s" : ""} ·{" "}
            {items.filter((i) => i.visible).length} visible on the site
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => { setShowForm(true); setError(""); }}
            className="bg-[#f26522] hover:bg-[#ff7a35] text-white font-bold px-5 py-2.5 rounded-full text-sm transition-all whitespace-nowrap"
          >
            + Add Product
          </button>
        )}
      </div>

      {msg && (
        <div role="status" className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl mb-5">
          {msg}
        </div>
      )}
      {error && (
        <div role="alert" className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5">
          {error}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">
          <h2 className="text-[#0d1f3c] font-bold text-base mb-5">
            {editing ? "Edit Product" : "New Product"}
          </h2>
          <form onSubmit={handleSave} noValidate className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_10rem] gap-4">
              <div>
                <label htmlFor="p-name" className={labelClass}>Name *</label>
                <input
                  id="p-name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Prompt Pack"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="p-price" className={labelClass}>Price (GHS)</label>
                <input
                  id="p-price"
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  value={form.price_ghs}
                  onChange={(e) => setForm({ ...form, price_ghs: e.target.value })}
                  placeholder="e.g. 150"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="p-desc" className={labelClass}>Short description</label>
              <input
                id="p-desc"
                value={form.description}
                maxLength={160}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="One line on what the buyer gets"
                className={inputClass}
              />
              <p className="text-xs text-slate-400 mt-1">{form.description.length}/160 characters</p>
            </div>

            <div>
              <label htmlFor="p-selar" className={labelClass}>Selar link (optional)</label>
              <input
                id="p-selar"
                type="url"
                value={form.selar_url}
                onChange={(e) => setForm({ ...form, selar_url: e.target.value })}
                placeholder="https://selar.com/..."
                aria-invalid={selarInvalid}
                className={`${inputClass} ${selarInvalid ? "border-red-400 focus:border-red-500" : ""}`}
              />
              <p className={`text-xs mt-1 ${selarInvalid ? "text-red-600" : "text-slate-400"}`}>
                {selarInvalid
                  ? "Must be a full link starting with https://"
                  : "Leave empty to show \"Coming soon\" on the site."}
              </p>
            </div>

            {/* Image Upload */}
            <div>
              <label className={labelClass}>Cover image</label>
              {form.image_url && (
                <div className="mb-3 relative w-full sm:w-80 aspect-[4/3] rounded-xl overflow-hidden border border-slate-200">
                  <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, image_url: "" })}
                    className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
                  >
                    Remove
                  </button>
                </div>
              )}
              <label
                className={`flex items-center justify-center gap-2 border-2 border-dashed rounded-xl px-4 py-4 cursor-pointer transition-all
                ${uploading
                  ? "border-slate-200 bg-slate-50 text-slate-400"
                  : "border-[#f26522]/40 hover:border-[#f26522] hover:bg-orange-50 text-[#f26522]"
                }`}
              >
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
              <p className="text-xs text-slate-400 mt-1">Or paste an image URL:</p>
              <input
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                placeholder="https://example.com/cover.png"
                className={`${inputClass} mt-1`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="p-order" className={labelClass}>Display order</label>
                <input
                  id="p-order"
                  type="number"
                  step="1"
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
                  placeholder={editing ? "" : "Leave empty to add at the end"}
                  className={inputClass}
                />
                <p className="text-xs text-slate-400 mt-1">Lower numbers show first.</p>
              </div>
              <div>
                <span className={labelClass}>Visible on the site</span>
                <label className="flex items-center gap-3 border-2 border-slate-200 rounded-xl px-4 py-3 bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.visible}
                    onChange={(e) => setForm({ ...form, visible: e.target.checked })}
                    className="w-4 h-4 accent-[#f26522]"
                  />
                  <span className="text-sm text-[#0d1f3c]">
                    {form.visible ? "Visible" : "Hidden"}
                  </span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                disabled={saving || uploading}
                className="bg-[#f26522] hover:bg-[#ff7a35] disabled:opacity-60 text-white font-bold px-6 py-2.5 rounded-full text-sm transition-all"
              >
                {saving ? "Saving..." : editing ? "Update Product" : "Save Product"}
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

      {/* List */}
      {loading ? (
        <div className="text-slate-400 text-sm py-10 text-center">Loading products...</div>
      ) : items.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center">
          <p className="text-slate-500 font-medium">No products yet. Add your first one.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((item, i) => {
            const s = status(item);
            const busy = busyId === item.id;
            return (
              <li
                key={item.id}
                data-testid="product-row"
                className={`bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 ${busy ? "opacity-60" : ""}`}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => move(i, -1)}
                      disabled={i === 0 || busy}
                      aria-label={`Move ${item.name} up`}
                      className="w-8 h-7 border border-slate-200 rounded-md text-slate-500 hover:border-[#0d1f3c] disabled:opacity-30 text-xs"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => move(i, 1)}
                      disabled={i === items.length - 1 || busy}
                      aria-label={`Move ${item.name} down`}
                      className="w-8 h-7 border border-slate-200 rounded-md text-slate-500 hover:border-[#0d1f3c] disabled:opacity-30 text-xs"
                    >
                      ↓
                    </button>
                  </div>
                  <div className="w-20 h-14 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                    {item.image_url ? (
                      <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-[#0d1f3c] font-bold text-sm truncate">{item.name}</h3>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${s.cls}`}>{s.label}</span>
                    </div>
                    <p className="text-slate-400 text-xs truncate">
                      #{item.sort_order} · {formatPrice(item.price_ghs) || "No price"} ·{" "}
                      {item.description || "No description"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => toggleVisible(item)}
                    disabled={busy}
                    className="border-2 border-slate-200 hover:border-[#0d1f3c] text-slate-600 text-xs font-semibold px-3 py-2 rounded-full transition-all"
                  >
                    {item.visible ? "Hide" : "Show"}
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    disabled={busy}
                    className="border-2 border-slate-200 hover:border-[#f26522] hover:text-[#f26522] text-slate-600 text-xs font-semibold px-3 py-2 rounded-full transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    disabled={busy}
                    className="border-2 border-slate-200 hover:border-red-400 hover:text-red-500 text-slate-500 text-xs font-semibold px-3 py-2 rounded-full transition-all"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
