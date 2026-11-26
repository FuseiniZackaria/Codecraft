import { AuthProvider, useAuth } from "./AuthContext";
import Login from "./Login";
import AdminLayout from "./AdminLayout";

function AdminGuard() {
  const { isAuthenticated, checking } = useAuth();
  if (checking) {
    return <div className="min-h-screen bg-[#0d1f3c]" />;
  }
  return isAuthenticated ? <AdminLayout /> : <Login />;
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <AdminGuard />
    </AuthProvider>
  );
}
