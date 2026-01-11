import { useState } from "react";

function AddEmployee({ onSubmit, disabled }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    specialization: "",
    role: "staff",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SUBMIT CLICKED", form);
    onSubmit?.(form);
  };

  return (
    <div
      style={{
        background: "#ffffff",
        color: "#213547",
        padding: "20px",
        maxWidth: "420px",
        borderRadius: "8px",
        boxShadow: "0 0 0 1px #ddd",
      }}
    >
      <h2>Add Employee</h2>

      <form onSubmit={handleSubmit}>
       <div>
  <input
    style={{ width: "100%", marginBottom: 10, padding: 8 }}
    name="name"
    placeholder="Name"
    value={form.name}
    onChange={handleChange}
  />

  <input
    style={{ width: "100%", marginBottom: 10, padding: 8 }}
    type="email"
    name="email"
    placeholder="Email"
    value={form.email}
    onChange={handleChange}
  />

  <input
    style={{ width: "100%", marginBottom: 10, padding: 8 }}
    name="specialization"
    placeholder="Specialization"
    value={form.specialization}
    onChange={handleChange}
  />

  <select
    style={{ width: "100%", marginBottom: 10, padding: 8 }}
    name="role"
    value={form.role}
    onChange={handleChange}
  >
    <option value="staff">Staff</option>
  </select>

  <button
    onClick={() => {
      console.log("SUBMIT CLICKED", form);
      onSubmit?.(form);
    }}
    disabled={disabled}
  >
    {disabled ? "Adding..." : "Add"}
  </button>
</div>
      </form>
    </div>
  );
}

export default AddEmployee;
