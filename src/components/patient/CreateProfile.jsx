// Form for new patients to create their profile with medical details
// same css for create profile and edit profile

// connect it to supabase to save detailss

import '../../styles/Patientprofile.css'
import {useState} from 'react'
import Notification from '../common/Notification';
import { supabase } from "../../lib/supabase";

export default function CreateProfile({ onSuccess }) {
    const [name,setName]=useState('');
    const [number,setNumber]=useState('');
    const [email,setEmail]=useState('');
    const[dob,setDob]=useState('');
    const [address,setAddress]=useState('');
    const [notify, setNotify] = useState('');
    

    const handleSubmit = async (e) => {
      e.preventDefault();

      const { data, error } = await supabase.from("patients").insert([
        {
          name,
          phone : number,
          email,
          dob,
          address,
        },
      ])
      .select()
      .single();

      

      if (error) {
        console.error(error);
        setNotify("Failed to create profile");
        return;
      }

      localStorage.setItem("patientId",data.id);
      localStorage.setItem("patientEmail",data.email);

      setNotify("Profile created Successfully");

      setTimeout(() => {
        onSuccess && onSuccess();
      }, 800)
    };

  return (
    <>
    {notify && <Notification message={notify} />}
    <div className='container'>
    
        <form className='form' onSubmit={handleSubmit}>
            <input 
            type='text'
            placeholder='Enter your name'
            value={name}
            required
            onChange={(e)=>setName(e.target.value)}
            />
            <input 
            type='tel'
            value={number}
            placeholder='Enter mobile number'
            required
            onChange={(e)=>setNumber(e.target.value)}
            />
            <input
            type='email'
            value={email}
            placeholder='Enter email'
            required
            onChange={(e)=>setEmail(e.target.value)} 
            />
            <input 
            type='date'
            value={dob}
            placeholder='Date of birth'
            required
            onChange={(e)=>setDob(e.target.value)}  
            onFocus={(e) => e.target.showPicker && e.target.showPicker()}                    
            />
            <input
            type='text'
            placeholder='Enter address'
            required
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
            />
          <button type="submit">
            Submit details
          </button>
        </form>

    </div>    
    </>
  );
}



