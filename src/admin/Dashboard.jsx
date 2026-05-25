import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

const STAT_CARDS = [
  { key: "visits", label: "Total Visits", icon: "👁", color: "bg-blue-50 text-blue-600" },
  { key: "clicks", label: "Total Clicks", icon: "🖱", color: "bg-orange-50 text-[#f26522]" },
  { key: "portfolio", label: "Portfolio Items", icon: "🖼", color: "bg-purple-50 text-purple-600" },
  { key: "posts", label: "Blog Posts", icon: "📝", color: "bg-green-50 text-green-600" },
];

export default function Dashboard({ setPage }) {
  const { logout } = useAuth();
  const [stats, setStats] = useState({ visits: 0, clicks: 0, portfolio: 0, posts: 0 });
  const [recentClicks, setRecentClicks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [
        { count: visits },
        { count: clicks },
        { count: portfolio },
        { count: posts },
        { data: clickData },
      ] = await Promise.all([
        supabase.from("analytics").select("*", { count: "exact", head: true }).eq("type", "visit"),
        supabase.from("analytics").select("*", { count: "exact", head: true }).eq("type", "click"),
        supabase.from("portfolio").select("*", { count: "exact", head: true }),
        supabase.from("posts").select("*", { count: "exact", head: true }),
        supabase.from("analytics").select("*").eq("type", "click").order("created_at", { ascending: false }).limit(8),
      ]);
      setStats({ visits: visits || 0, clicks: clicks || 0, portfolio: portfolio || 0, posts: posts || 0 });
      setRecentClicks(clickData || []);
      setLoading(false);
    }
    load();
  }, []);

  const statValues = [stats.visits, stats.clicks, stats.portfolio, stats.posts];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0d1f3c] tracking-tight">Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Welcome back, Admin 👋</p>
        </div>
        <div className="flex gap-3">
          <a href="/" target="_blank" rel="noreferrer"
            className="border-2 border-slate-200 hover:border-[#0d1f3c] text-[#0d1f3c] text-sm font-semibold px-4 py-2 rounded-full transition-all">
            View Site ↗
          </a>
          <button onClick={logout}
            className="border-2 border-red-200 hover:border-red-400 text-red-500 text-sm font-semibold px-4 py-2 rounded-full transition-all">
            Logout
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {STAT_CARDS.map((card, i) => (
          <div key={card.key} className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center text-lg mb-3`}>
              {card.icon}
            </div>
            <p className="text-3xl font-extrabold text-[#0d1f3c] tracking-tight">
              {loading ? "—" : statValues[i]}
            </p>
            <p className="text-slate-400 text-xs mt-1 font-medium">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions + Recent Clicks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-[#0d1f3c] font-bold text-base mb-5">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            {[
              { label: "Add Portfolio Project", icon: "🖼", page: "portfolio" },
              { label: "Write Blog Post", icon: "📝", page: "blog" },
            ].map((a) => (
              <button key={a.page} onClick={() => setPage(a.page)}
                className="flex items-center gap-3 border-2 border-slate-100 hover:border-[#f26522] hover:bg-orange-50 rounded-xl p-4 text-left transition-all group">
                <span className="text-xl">{a.icon}</span>
                <span className="text-[#0d1f3c] font-semibold text-sm group-hover:text-[#f26522] transition-colors">
                  {a.label}
                </span>
                <span className="ml-auto text-slate-300 group-hover:text-[#f26522]">→</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Clicks */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-[#0d1f3c] font-bold text-base mb-5">Recent Clicks</h2>
          {loading ? (
            <p className="text-slate-400 text-sm">Loading...</p>
          ) : recentClicks.length === 0 ? (
            <p className="text-slate-400 text-sm">No clicks recorded yet.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {recentClicks.map((c) => (
                <div key={c.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <span className="text-sm text-[#0d1f3c] font-medium">{c.label}</span>
                  <span className="text-xs text-slate-400">
                    {new Date(c.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
