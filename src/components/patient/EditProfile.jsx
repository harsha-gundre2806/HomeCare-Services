import "../../styles/Patientprofile.css";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Notification from "../common/Notification";

export default function EditProfile({ onSuccess }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [notify, setNotify] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const patientId = localStorage.getItem("patientId");
      if (!patientId) return;

      const { data, error } = await supabase
        .from("patients")
        .select("*")
        .eq("id", patientId)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setName(data.name);
      setNumber(data.phone);
      setEmail(data.email);
      setDob(data.dob);
      setAddress(data.address);
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const patientId = localStorage.getItem("patientId");

    if(!patientId) {
      setNotify("Patient profile not found. Please create profile again");
      return;
    }

    const { error } = await supabase
      .from("patients")
      .update({
        name,
        phone: number,
        dob,
        address,
      })
      .eq("id", patientId);

    if (error) {
      console.error(error);
      setNotify("Failed to update profile");
      return;
    }

    setNotify("Profile updated successfully");

    setTimeout(() => {
      onSuccess && onSuccess();
    }, 800);
  };

  return (
    <>
      {notify && <Notification message={notify} />}
      <div className="container">
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Enter mobile number"
            value={number}
            required
            onChange={(e) => setNumber(e.target.value)}
          />
          <input
            type="email"
            value={email}
            disabled
          />
          <input
            type="date"
            value={dob}
            required
            onChange={(e) => setDob(e.target.value)}
            onFocus={(e) => e.target.showPicker && e.target.showPicker()}
          />
          <input
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </>
  );
}
