import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2000);
    const hideTimer = setTimeout(() => setVisible(false), 2600);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#0d1f3c] flex flex-col items-center justify-center transition-opacity duration-500"
      style={{ opacity: fadeOut ? 0 : 1 }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-[#f26522] text-white font-extrabold text-2xl px-3 py-2 rounded-lg font-mono">
            &lt;/&gt;
          </span>
          <span className="text-white font-extrabold text-3xl tracking-tight">
            CODECRAFT
          </span>
        </div>
        <p className="text-white/50 text-sm tracking-widest uppercase">
          Websites that convert
        </p>
        <div className="mt-8 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#f26522] rounded-full"
            style={{ animation: "progress 1.8s ease forwards" }}
          />
        </div>
      </div>
      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}