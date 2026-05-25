import { useState } from "react";
import { useAuth } from "./AuthContext";

export default function Login() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    login(password);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0d1f3c] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="bg-[#f26522] text-white font-extrabold text-sm px-2 py-1 rounded-md font-mono">
              &lt;/&gt;
            </span>
            <span className="text-white font-extrabold text-xl tracking-tight">
              CODECRAFT
            </span>
          </div>
          <p className="text-white/50 text-sm">Admin Dashboard</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <h1 className="text-[#0d1f3c] font-extrabold text-2xl mb-1 tracking-tight">
            Welcome back
          </h1>
          <p className="text-slate-400 text-sm mb-7">
            Enter your password to continue
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-bold text-[#0d1f3c] uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full border-2 border-slate-200 focus:border-[#f26522] rounded-xl px-4 py-3 text-sm outline-none bg-slate-50 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f26522] hover:bg-[#ff7a35] disabled:opacity-60 text-white font-bold py-3.5 rounded-full transition-all flex items-center justify-center gap-2"
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          CodeCraft Admin · Restricted Access
        </p>
      </div>
    </div>
  );
}
