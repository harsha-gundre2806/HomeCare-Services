//Form to submit new service request that enters admin queue
// used same css as create profile and edit profile

import {useState,useEffect} from 'react'
import Notification from '../common/Notification';

export default function ServiceRequest() {
    const [number,setNumber] = useState('');
    const [name,setName] = useState('');
    const [address,setAddress] = useState('');
    const [text , setText] = useState('');
    const [notify,setNotify]=  useState('');

    const handleSubmit=(e)=>{   // we will connect it to backend
        e.preventDefault();
        setNotify('Details submitted successfully , you will receive estimated time of staff arrival and conformation message in a minute');
        setTimeout(()=> setNotify(''),8000);
        
        console.log('details submitted',{
            name,
            number,
            address,
            text
        });
        setName('');
        setNumber('');
        setAddress('');
        setText('');
    }

    useEffect(()=>{
      const existingProfile={
        name:'example name',
        number:'9876543210',
        address:'india',
      };
      setName(existingProfile.name);
      setNumber(existingProfile.number);
      setAddress(existingProfile.address);
    },[]);

  return (
    <>
    {notify && <Notification message={notify}/> }    
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
            type='text'
            placeholder='enter address'
            required
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
            />
            <textarea
            type='text'
            placeholder='enter the reason for service'
            value={text}
            rows='3'
            style={{
                backgroundColor:'white',
                color:'black',
            }}

            onChange={(e)=>setText(e.target.value)}
            />
          <button type="submit" >
            submit details
          </button>
        </form>

    </div> 
    </>
  )
}

