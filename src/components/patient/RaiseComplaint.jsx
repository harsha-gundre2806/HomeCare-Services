import "../../styles/Patientprofile.css";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Notification from "../common/Notification";

export default function RaiseComplaint({ onSuccess }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [text, setText] = useState("");
  const [notify, setNotify] = useState("");

  useEffect(() => {
    const fetchPatient = async () => {
      const patientId = localStorage.getItem("patientId");
      if (!patientId) return;

      const { data } = await supabase
        .from("patients")
        .select("name, phone")
        .eq("id", patientId)
        .single();

      if (data) {
        setName(data.name);
        setNumber(data.phone);
      }
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

    const { error } = await supabase.from("complaints").insert([
      {
        patient_id: patientId,
        name,
        phone: number,
        complaint: text,
      },
    ]);

    if (error) {
      console.error(error);
      setNotify("Failed to raise complaint");
      return;
    }

    setNotify("Complaint raised successfully");

    setTimeout(() => {
      onSuccess && onSuccess();
    }, 800);
  };

  return (
    <>
      {notify && <Notification message={notify} />}
      <div className="container">
        <form onSubmit={handleSubmit} className="form">
          <input value={name} disabled />
          <input value={number} disabled />

          <textarea
            placeholder="Complaint reason"
            value={text}
            rows="3"
            required
            onChange={(e) => setText(e.target.value)}
          />

          <button type="submit">Raise Complaint</button>
        </form>
      </div>
    </>
  );
}
