import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Notification from "../common/Notification";
import "../../styles/Patientprofile.css";

export default function ServiceRequest({ onSuccess }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [text, setText] = useState("");
  const [emergency, setEmergency] = useState("");
  const [notify, setNotify] = useState("");

  useEffect(() => {
    const fetchPatient = async () => {
      const patientId = localStorage.getItem("patientId");
      if (!patientId) return;

      const { data, error } = await supabase
        .from("patients")
        .select("name, phone, address")
        .eq("id", patientId)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setName(data.name);
      setNumber(data.phone);
      setAddress(data.address);
    };

    fetchPatient();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const patientId = localStorage.getItem("patientId");
    if (!patientId) {
      setNotify("Patient profile not found");
      return;
    }

    const { error } = await supabase
      .from("service_requests")
      .insert([
        {
          patient_id: patientId,
          name,
          phone: number,
          address,
          reason: text,
          service_type: emergency || "regular",
          status: "pending",
        },
      ]);

    if (error) {
      console.error(error);
      setNotify("Failed to submit service request");
      return;
    }

    setNotify("Service request submitted successfully");

    setTimeout(() => {
      onSuccess && onSuccess();
    }, 1000);
  };

  return (
    <>
      {notify && <Notification message={notify} />}
      <div className="container">
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="tel"
            value={number}
            required
            onChange={(e) => setNumber(e.target.value)}
          />
          <input
            type="text"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <textarea
            value={text}
            rows="3"
            onChange={(e) => setText(e.target.value)}
          />
          <select
            value={emergency}
            onChange={(e) => setEmergency(e.target.value)}
          >
            <option value="">select service type</option>
            <option value="regular">Regular</option>
            <option value="emergency">Emergency</option>
          </select>

          <button type="submit">Submit Details</button>
        </form>
      </div>
    </>
  );
}
