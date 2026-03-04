// Main staff overview showing assigned patients and daily tasks


import { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import DashboardLayout from "../layout/DashboardLayout";
import LoadingSpinner from "../components/common/LoadingSpinner";

import ServiceStatus from "../components/staff/ServiceStatus";
import MyRatingsContainer from "./staff/MyRatingsContainer";
import StaffAssignmentsContainer from "./staff/StaffAssignmentsContainer";

export default function StaffDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // simulate loading
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "assignments":
        return <StaffAssignmentsContainer />;

      case "status":
        return <ServiceStatus />;

      case "ratings":
        return <MyRatingsContainer />;

      default:
        return (
          <div style={{ color: "black" }}>
            <h1>Welcome Staff Dashboard</h1>
            <p>Manage your assigned services and track patient care progress.</p>
          </div>
        );
    }
  };

  const sidebar = (
    <nav className="d-nav">
      <button
        className={activeTab === "overview" ? "active" : ""}
        onClick={() => setActiveTab("overview")}
      >
        Home
      </button>

      <hr className="d-divider" />

      <button
        className={activeTab === "assignments" ? "active" : ""}
        onClick={() => setActiveTab("assignments")}
      >
        My Assignments
      </button>

      <button
        className={activeTab === "status" ? "active" : ""}
        onClick={() => setActiveTab("status")}
      >
        Service Status
      </button>

      <button
        className={activeTab === "ratings" ? "active" : ""}
        onClick={() => setActiveTab("ratings")}
      >
        My Ratings
      </button>
    </nav>
  );

  return (
    <>
      {isLoading && <LoadingSpinner />}

      <DashboardLayout
        title="Staff Dashboard"
        sidebar={sidebar}
        showBackButton={activeTab !== "overview"}
        onBack={() => setActiveTab("overview")}
      >
        {renderContent()}
      </DashboardLayout>
    </>
  );
}
