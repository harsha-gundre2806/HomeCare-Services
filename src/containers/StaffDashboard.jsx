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

  // Your local staff details
  const staff = {
    name: "A. Prasanth",
    id: "STF-2026-001",
    dept: "Technical Operations",
    status: "On Duty",
    tasksCompleted: "14/20"
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "assignments":
        return <MyAssessment />;

      case "status":
        return <ServiceStatus />;
      case "ratings":
        return <MyRating />;

      default:
        return (
          <div className="home-view">
            <h1 style={{ color: "#1e293b", fontSize: "28px", marginBottom: "8px" }}>
              Welcome back, {staff.name}
            </h1>
            <p style={{ color: "#64748b", marginBottom: "32px" }}>
              Here is what's happening with your assignments today.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div style={{ padding: "24px", borderRadius: "16px", border: "1px solid #f1f5f9", background: "#f8fafc" }}>
                <h4 style={{ margin: "0 0 12px 0", color: "#475569" }}>Staff Details</h4>
                <div style={{ fontSize: "14px", color: "#64748b", lineHeight: "2" }}>
                   <div><strong>Employee ID:</strong> {staff.id}</div>
                   <div><strong>Department:</strong> {staff.dept}</div>
                   <div><strong>Current Status:</strong> <span style={{ color: "#10b981" }}>● {staff.status}</span></div>
                </div>
              </div>

              <div style={{ padding: "24px", borderRadius: "16px", background: "#4f46e5", color: "white" }}>
                <h4 style={{ margin: "0 0 12px 0", opacity: 0.9 }}>Daily Progress</h4>
                <div style={{ fontSize: "32px", fontWeight: "700" }}>{staff.tasksCompleted}</div>
                <div style={{ fontSize: "14px", opacity: 0.8 }}>Tasks finished today</div>
              </div>
            </div>
          </div>
        );
    }
  };

  const sidebar = (
    <nav className="d-nav">
      <button className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>
        Home
      </button>
      <hr className="d-divider" />
      <button className={activeTab === "assignments" ? "active" : ""} onClick={() => setActiveTab("assignments")}>
        My Assignments
      </button>
      <button className={activeTab === "status" ? "active" : ""} onClick={() => setActiveTab("status")}>
        Service Status
      </button>
      <button className={activeTab === "ratings" ? "active" : ""} onClick={() => setActiveTab("ratings")}>
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