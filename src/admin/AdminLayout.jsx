import { useState } from "react";
import { useAuth } from "./AuthContext";
import Dashboard from "./Dashboard";
import PortfolioManager from "./PortfolioManager";
import BlogManager from "./BlogManager";
import TestimonialsManager from "./TestimonialsManager";


const NAV = [
  { key: "dashboard", label: "Dashboard", icon: "📊" },
  { key: "portfolio", label: "Portfolio", icon: "🖼" },
  { key: "blog", label: "Blog Posts", icon: "📝" },
  { key: "testimonials", label: "Testimonials", icon: "💬" },
];

export default function AdminLayout() {
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();

  const renderPage = () => {
    switch (page) {
      case "portfolio": return <PortfolioManager />;
      case "blog": return <BlogManager />;
      case "testimonials": return <TestimonialsManager />;
      default: return <Dashboard setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-60 bg-[#0d1f3c] flex flex-col transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="bg-[#f26522] text-white font-extrabold text-xs px-2 py-1 rounded font-mono">&lt;/&gt;</span>
            <span className="text-white font-extrabold tracking-tight">CODECRAFT</span>
          </div>
          <p className="text-white/40 text-xs mt-1">Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 flex flex-col gap-1">
          {NAV.map((item) => (
            <button key={item.key} onClick={() => { setPage(item.key); setSidebarOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left w-full transition-all ${
                page === item.key
                  ? "bg-[#f26522] text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}>
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-white/10">
          <a href="/" target="_blank" rel="noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/10 text-sm font-medium transition-all w-full">
            <span>🌐</span> View Website
          </a>
          <button onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-900/20 text-sm font-medium transition-all w-full mt-1">
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Mobile topbar */}
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="text-[#0d1f3c] text-xl">☰</button>
          <span className="font-extrabold text-[#0d1f3c] tracking-tight">
            {NAV.find((n) => n.key === page)?.label}
          </span>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-10 max-w-6xl w-full mx-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
