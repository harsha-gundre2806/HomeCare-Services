// Login page for all user roles (admin/staff/patient) with phone/password

import { useState } from "react";
import Notification from "../../components/common/Notification";
import bcrypt from 'bcryptjs';
import { supabase } from '../../lib/supabase';
import "../../styles/Login.css";

export default function Login({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [notify, setNotify] = useState("");
  const [identifier, setIdentifier ] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!identifier || !password) {
      setNotify("Please enter phone/email and password");
      return;
    }

    const { data } = await supabase
      .from("patients")
      .select("*")
      .or(`phone.eq."${identifier}",email.eq."${identifier}"`)
      .maybeSingle();

      if(!data) {
        setNotify("User not found");
        return;
      }  

      if(!data.password_hash) {
        setNotify("password not set, Please create profile again. ");
        return;
      }

      setNotify("");
      const isMatch = await bcrypt.compare(password, data.password_hash);

      if(!isMatch) {
        setNotify("Invalid Password");
        return;
      }

      localStorage.setItem("patientId", data.id);
      localStorage.setItem("patientEmail", data.email);
      
      setNotify("Login successful");

      setTimeout(() => {
         onSuccess && onSuccess();
    }, 800);
  };

  return (
    <>
      {notify && <Notification message={notify} />}

      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>

          <input
            type="text"
            placeholder="Phone number or email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
