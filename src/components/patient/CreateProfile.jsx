// Form for new patients to create their profile with medical details
// same css for create profile and edit profile

import '../../styles/Patientprofile.css'
import {useState} from 'react'
import Notification from '../common/Notification';

export default function CreateProfile() {
    const [name,setName]=useState('');
    const [number,setNumber]=useState('');
    const [email,setEmail]=useState('');
    const[dob,setDob]=useState('');
    const [address,setAddress]=useState('');
    const [notify, setNotify] = useState('');

    const handleSubmit = (e)=> {    // we will connect it to backend
        e.preventDefault();

        setNotify('profile created');
        setTimeout(() => setNotify(''), 5000);
        
        console.log('details submitted');
        setName('');
        setNumber('');
        setEmail('');
        setDob('');
        setAddress('');
    }
  return (
    <>
    {notify && <Notification message={notify} />}
    <div className='container'>
    
        <form className='form' onSubmit={handleSubmit}>
            <input 
            type='text'
            placeholder='enter name'
            value={name}
            required
            onChange={(e)=>setName(e.target.value)}
            />
            <input 
            type='tel'
            value={number}
            placeholder='enter mobile number'
            required
            onChange={(e)=>setNumber(e.target.value)}
            />
            <input
            type='email'
            value={email}
            placeholder='enter email'
            required
            onChange={(e)=>setEmail(e.target.value)} 
            />
            <input 
            type='date'
            value={dob}
            placeholder='date of birth'
            required
            onChange={(e)=>setDob(e.target.value)}  
            onFocus={(e) => e.target.showPicker && e.target.showPicker()}                    
            />
            <input
            type='text'
            placeholder='enter address'
            required
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
            />
          <button type="submit">
            submit details
          </button>
        </form>

    </div>    
    </>
  );
}



