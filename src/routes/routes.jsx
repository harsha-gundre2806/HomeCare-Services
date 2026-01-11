import { createBrowserRouter } from "react-router-dom";
import AddEmployeePage from "../pages/admin/AddEmployeePage";
import CreateProfile from "../components/patient/CreateProfile";

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

  
]);

export default router;
