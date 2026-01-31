import { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import { supabase } from "../../lib/supabase";
import Notification from "../common/Notification";
import "../../styles/Patientprofile.css";

export default function RateStaff({ onSuccess }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [staff, setStaff] = useState("");
  const [rating, setRating] = useState(0);
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

    if (!rating) {
      setNotify("Please select a star rating");
      return;
    }

    const patientId = localStorage.getItem("patientId");
    if (!patientId) {
      setNotify("Patient not found. Please login again.");
      return;
    }

    const { error } = await supabase.from("staff_ratings").insert({
      patient_id: patientId,
      patient_name: name,
      patient_phone: number,
      staff,
      rating,
      feedback: text,
    });

    if (error) {
      console.error(error);
      setNotify("Failed to submit rating");
      return;
    }

    setNotify("Thank you for your rating");

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

          <input
            type="text"
            placeholder="Enter staff name / id"
            value={staff}
            required
            onChange={(e) => setStaff(e.target.value)}
          />

          <Rating
            initialValue={rating}
            onClick={(rate) => setRating(rate)}
            size={30}
            fillColor="orange"
            emptyColor="gray"
          />

          <textarea
            placeholder="Give your feedback"
            value={text}
            rows="3"
            onChange={(e) => setText(e.target.value)}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
