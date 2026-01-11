// Form for new patients to create their profile with medical details

import React,{useState} from 'react'

export default function CreateProfile() {
    const [name,setName]=useState('');
    const [number,setNumber]=useState('');
    const [email,setEmail]=useState('');
    const[dob,setDob]=useState('');
    const [address,setAddress]=useState('');

    const handleSubmit = (e)=> {
        e.preventDefault();
        // need to add notification
        console.log('details submitted');
    }
  return (
    <>
    <div className='container'>
        <form onSubmit={handleSubmit} className='form'>
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


// option 2

// export default function CreateProfile() {
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     age: '',
//     address: ''
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("patients data:", formData);
//   };

//   return (
//     <div className='container'>
//       <h2>Patient Profile</h2>
//       <form onSubmit={handleSubmit} className='form'>
//         <label>Full Name</label>
//         <input name="name" type='text' required value={formData.name} onChange={handleChange} />
//         <label>mobile Number</label>
//         <input name="phone" type='tel' required value={formData.phone} onChange={handleChange} />
//         <label>Email</label>
//         <input name="email" type='email' required value={formData.email} onChange={handleChange} />
//         <label>Age</label>
//         <input name="age" type='number' required value={formData.age} onChange={handleChange} />
//         <label>Address</label>
//         <textarea name="address" required value={formData.address} onChange={handleChange} />
//         <button type="submit">Save Profile</button>
//       </form>
//     </div>
//   );
// }