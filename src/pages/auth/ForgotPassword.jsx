import { useState } from "react";
import Notification from "../../components/common/Notification";
import "../../styles/Login.css";

export default function PasswordReset({ onSuccess }) {
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notify, setNotify] = useState("");
  const [step, setStep] = useState(1); // 1 = send otp, 2 = verify

  /* ---------- SEND OTP ---------- */
  const sendOtp = async () => {
    setNotify("");

    const res = await fetch("http://localhost:5000/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contact }),
    });

    const data = await res.json();

    if (!res.ok) {
      setNotify(data.message);
      return;
    }

    setNotify("OTP sent successfully");
    setStep(2);
  };

  /* ---------- VERIFY OTP ---------- */
  const resetPassword = async (e) => {
    e.preventDefault();
    setNotify("");

    if (newPassword !== confirmPassword) {
      setNotify("Passwords do not match");
      return;
    }

    const res = await fetch("http://localhost:5000/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contact,
        otp,
        newPassword,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setNotify(data.message);
      return;
    }

    setNotify("Password reset successful");

    setTimeout(() => {
      onSuccess && onSuccess();
    }, 800);
  };

  return (
    <>
      {notify && <Notification message={notify} />}

      <div className="login-container">
        <form className="login-form" onSubmit={resetPassword}>
          <h2>Password Reset</h2>

          <input
            type="text"
            placeholder="Phone number or email"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            disabled={step === 2}
          />

          {step === 1 && (
            <button type="button" onClick={sendOtp}>
              Send OTP
            </button>
          )}

          {step === 2 && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <button type="submit">Reset Password</button>
            </>
          )}
        </form>
      </div>
    </>
  );
}
