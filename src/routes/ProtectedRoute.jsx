import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const patientId = localStorage.getItem("patientId");

  if (!patientId) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
