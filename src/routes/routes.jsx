import { createBrowserRouter } from "react-router-dom";
import AddEmployeePage from "../pages/admin/AddEmployeePage";
import CreateProfile from "../components/patient/CreateProfile";
import EditProfile from "../components/patient/EditProfile";
import ServiceRequest from "../components/patient/ServiceRequest";
import RateStaff from "../components/patient/RateStaff";
import RaiseComplaint from "../components/patient/RaiseComplaint";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AddEmployeePage />, // temporary home
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
]);

export default router;
