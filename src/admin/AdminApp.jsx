import { AuthProvider, useAuth } from "./AuthContext";
import Login from "./Login";
import AdminLayout from "./AdminLayout";

function AdminGuard() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AdminLayout /> : <Login />;
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <AdminGuard />
    </AuthProvider>
  );
}
