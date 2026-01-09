import { useAppSelector } from "@/hooks/redux";
import type React from "react";
import TriangleLoader from "../ui/triangle-loader";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();
  if (isAuthenticated === null) {
    return <TriangleLoader />;
  }
  if (!isAuthenticated) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

export default ProtectedRoute;
