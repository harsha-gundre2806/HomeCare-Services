import { createBrowserRouter } from "react-router-dom";
import AddEmployeePage from "../pages/admin/AddEmployeePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AddEmployeePage />, // temporary home
  },
  {
    path: "/add-employee",
    element: <AddEmployeePage />,
  },
]);

export default router;
