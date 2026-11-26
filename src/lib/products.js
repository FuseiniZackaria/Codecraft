// Shared rules for Digital Products (admin form + public page).

// A Selar link must be a full https URL with a real host, e.g.
// https://selar.com/abc123 or https://selar.co/m/yourstore.
export function isValidHttpsUrl(value) {
  if (!value) return false;
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" && url.hostname.includes(".");
  } catch {
    return false;
  }
}

export function formatPrice(price) {
  if (price === null || price === undefined || price === "") return "";
  const n = Number(price);
  if (Number.isNaN(n)) return "";
  return `GHS ${n.toLocaleString("en-GH", {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}
