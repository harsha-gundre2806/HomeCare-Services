// adding employee
import React, { useState } from 'react';
import Notification from '../pages/Notification';
import './AddEmp.css'


export default function AddEmp() {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notify, setNotify] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!role) {
      setNotify('Please select a role');``
      return;
    }
    setNotify(`${role} added successfully`);
    setTimeout(() => setNotify(''), 5000);
  };

  return (
    <>
      {notify && <Notification message={notify} />}

      <div className="container">
        <form onSubmit={handleSubmit} className="form">
        <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input"
            required >
            <option value="">Select Role</option>
            <option value="Hospital Admin">Hospital Admin</option>
            <option value="ICU Manager">ICU Manager</option>
            <option value="Ward Staff">Ward Staff</option>
            <option value="Er Staff">Er Staff</option>
        </select>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input" />
          <button type="submit" className="button">
            Add Employee
          </button>
        </form>
      </div>
    </>
  );
}
