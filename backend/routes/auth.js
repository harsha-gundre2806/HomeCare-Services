import express from "express";
import { supabase } from "../supabaseClient.js";
import bcrypt from "bcryptjs";
import { Resend } from "resend";

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

/* ---------------- SEND OTP ---------------- */
router.post("/send-otp", async (req, res) => {
  const { contact } = req.body;

  if (!contact) {
    return res.status(400).json({ message: "Contact is required" });
  }

  // find patient by phone OR email
  const { data: patient } = await supabase
    .from("patients")
    .select("id, email")
    .or(`phone.eq."${contact}",email.eq."${contact}"`)
    .maybeSingle();

  if (!patient) {
    return res.status(404).json({ message: "User not found" });
  }

  // generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // expiry: 5 minutes
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  // store OTP
  await supabase.from("password_otps").insert({
    patient_id: patient.id,
    otp,
    expires_at: expiresAt,
  });

  // send email
  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: patient.email,
    subject: "Your Password Reset OTP",
    html: `
      <h2>Password Reset</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP expires in 5 minutes.</p>
    `,
  });

  res.json({ message: "OTP sent successfully" });
});

/* ---------------- VERIFY OTP + RESET PASSWORD ---------------- */
router.post("/verify-otp", async (req, res) => {
  const { contact, otp, newPassword } = req.body;

  if (!contact || !otp || !newPassword) {
    return res.status(400).json({ message: "Missing fields" });
  }

  // find patient
  const { data: patient } = await supabase
    .from("patients")
    .select("id")
    .or(`phone.eq."${contact}",email.eq."${contact}"`)
    .maybeSingle();

  if (!patient) {
    return res.status(404).json({ message: "User not found" });
  }

  // find OTP
  const { data: otpRow } = await supabase
    .from("password_otps")
    .select("*")
    .eq("patient_id", patient.id)
    .eq("otp", otp)
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false })
    .maybeSingle();

  if (!otpRow) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  // hash new password
  const passwordHash = await bcrypt.hash(newPassword, 10);

  // update password
  await supabase
    .from("patients")
    .update({ password_hash: passwordHash })
    .eq("id", patient.id);

  // delete used OTP
  await supabase
    .from("password_otps")
    .delete()
    .eq("id", otpRow.id);

  res.json({ message: "Password reset successful" });
});

export default router;
