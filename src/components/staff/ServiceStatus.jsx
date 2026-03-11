//Component to update and display current service status progress

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import "../../styles/ServiceStatus.css";


export default function ServiceStatus() {
  const steps = ["pending", "assigned", "completed"];

  const [services, setServices] = useState([]);

  useEffect(() => {
  loadServices();
}, []);

async function loadServices() {
  const { data, error } = await supabase
    .from("service_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading services:", error);
    return;
  }

  setServices(data || []);
}

  const moveNext = async (id) => {
    console.log("Button clicked for service:", id);
  const service = services.find((s) => s.id === id);
  if (!service) return;
  const nextIndex = steps.indexOf(service.status) + 1;
  const nextStatus = steps[nextIndex] || "completed";

  const { data, error } = await supabase
    .from("service_requests")
    .update({ status: nextStatus })
    .eq("id", id)
    .select();

console.log("Update result:", data);
console.log("Update error:", error);

  if (error) {
    console.error("Status update failed:", error);
    return;
  }

  loadServices();
};

  return (
    <div className="service-container">
      <h2>Service Status</h2>

      {services.map((service) => {
        const currentIndex = steps.indexOf(service.status);

        return (
          <div key={service.id} className="service-card">

            {/* DETAILS */}
            <div className="service-info">
              <p><b>Service ID:</b> {service.id}</p>
              <p><b>Service Name:</b> {service.service_type}</p>
              <p><b>Patient Name:</b> {service.name}</p>
              <p><b>Current Status:</b> {service.status}</p>
            </div>

            {/* STEPPER */}
            <div className="stepper">
              {steps.map((step, index) => (
                <div key={index} className="step">
                  <div className={`circle ${index <= currentIndex ? "active" : ""}`}>
                    {index + 1}
                  </div>
                  <div className="label">{step}</div>

                  {index < steps.length - 1 && (
                    <div className={`line ${index < currentIndex ? "active" : ""}`} />
                  )}
                </div>
              ))}
            </div>

            {service.status !== "completed" && (
              <button className="done-btn" onClick={() => moveNext(service.id)}>
                Mark as Done
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}


