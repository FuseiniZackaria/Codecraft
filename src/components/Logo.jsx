// CodeCraft GH logo: the "C" mark (public/logo-mark.png) plus the name.
// `onDark` switches the name to white for navy backgrounds.
export default function Logo({ onDark = false, size = "md", className = "" }) {
  const mark = size === "lg" ? "w-11 h-11" : size === "sm" ? "w-7 h-7" : "w-9 h-9";
  const text = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-lg";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/logo-mark.png"
        alt=""
        width="128"
        height="128"
        className={`${mark} rounded-md flex-shrink-0`}
      />
      <span
        className={`font-display font-bold tracking-tight whitespace-nowrap ${text} ${
          onDark ? "text-white" : "text-navy"
        }`}
      >
        CodeCraft GH
      </span>
    </span>
  );
}
