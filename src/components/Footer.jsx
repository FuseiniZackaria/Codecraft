import { TRUST_BADGES } from "../data/constants";

export default function Footer() {
  return (
    <footer className="bg-[#07122a] border-t border-white/5 px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-white/40 text-sm text-center sm:text-left">
          © 2026{" "}
          <strong className="text-white font-bold">CODECRAFT &lt;/&gt;</strong>{" "}
          · All rights reserved · Accra, Ghana
        </p>
        <div className="flex flex-wrap gap-5 justify-center">
          {TRUST_BADGES.map(({ icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-white/60 text-xs font-semibold"
            >
              <div className="w-6 h-6 border border-[#f26522] rounded-full flex items-center justify-center text-[#f26522] text-xs">
                {icon}
              </div>
              {label}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
