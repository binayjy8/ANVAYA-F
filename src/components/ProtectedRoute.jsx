import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import AppHeader from "./AppHeader";

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}