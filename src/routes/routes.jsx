import { createBrowserRouter } from "react-router-dom";
import AddEmployeePage from "../pages/admin/AddEmployeePage";
import CreateProfile from "../components/patient/CreateProfile";
import EditProfile from "../components/patient/EditProfile";
import ServiceRequest from "../components/patient/ServiceRequest";
import RateStaff from "../components/patient/RateStaff";
import RaiseComplaint from "../components/patient/RaiseComplaint";
import PatientDashboard from "../containers/PatientDashboard";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
  path: "/",
  element: localStorage.getItem("patientId")
    ? <ProtectedRoute><PatientDashboard /></ProtectedRoute>
    : <Login onSuccess={() => window.location.href = "/patient-dashboard"} />,
},
  {
    path: "/add-employee",
    element: <AddEmployeePage />,
  },
  {
    path: "/create-profile",
    element: <CreateProfile />,
  },
  {
    path: "/edit-profile",
    element: <EditProfile />,
  },
  {
    path: "/service-request",
    element: <ServiceRequest />,
  },
  {
    path: "/rate-staff",
    element: <RateStaff />,
  },
  {
    path: "/raise-complaint",
    element: <RaiseComplaint />,
  },
  {
    path: "/patient-dashboard",
    element: (<ProtectedRoute>
      <PatientDashboard />
    </ProtectedRoute> 
    ),
  },
  {
    path: "/login",
    element: <Login onSuccess={() => window.location.href = "/patient-dashboard"} />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]);

export default router;
