//Form for patients to update their existing profile information
// same css for create profile and edit profile
import '../../styles/Patientprofile.css'
import { useState, useEffect } from 'react';
import Notification from '../common/Notification';

export default function EditProfile() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [notify, setNotify] = useState('');


  useEffect(() => {
    // replace this later by connecting to database
    const existingprofile = { 
      name: 'example name',
      number: '9999999999',
      email: 'name@gmail.com',
      dob: '1111-11-11', 
      address: 'tirupati'
    };
    setName(existingprofile.name);
    setNumber(existingprofile.number);
    setEmail(existingprofile.email);
    setDob(existingprofile.dob);
    setAddress(existingprofile.address);
  }, []);

  const handleSubmit = (e) => {   // we will connect it to backend
    e.preventDefault();
    console.log('Updated profile details:', {
      name,
      number,
      email,
      dob,
      address
    });
    setNotify('Profile updated successfully');
    setTimeout(() => setNotify(''), 5000);
  };

  return (
    <>
      {notify && <Notification message={notify} />}
      <div className='container'>
        <form onSubmit={handleSubmit} className='form'>
          <input 
            type='text'
            placeholder='Enter name'
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <input 
            type='tel'
            value={number}
            placeholder='Enter mobile number'
            required
            onChange={(e) => setNumber(e.target.value)}
          />
          <input
            type='email'
            value={email}
            placeholder='Enter email'
            required
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type='date'
            value={dob}
            placeholder='Date of birth'
            required
            onChange={(e) => setDob(e.target.value)} 
            onFocus={(e) => e.target.showPicker && e.target.showPicker()}                     
          />
          <input
            type='text'
            placeholder='Enter address'
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button type="submit">
            Update Profile
          </button>
        </form>
      </div>    
    </>
  );
}