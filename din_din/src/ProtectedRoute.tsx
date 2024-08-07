import { Navigate } from "react-router-dom";
import { ProtectedRouteProps } from "./Types/types";

export function ProtectedRoute({
  isAuthenticated,
  children,
}: Readonly<ProtectedRouteProps>) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
