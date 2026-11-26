// Previously faded every block in on scroll. Kept as a plain wrapper so
// existing markup doesn't need to change; it no longer animates.
export default function Reveal({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}
