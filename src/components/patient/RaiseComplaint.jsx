// Form for patients to submit complaints about staff or service

import {useState, useEffect} from 'react'
import Notification from '../common/Notification'


export default function RaiseComplaint() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [notify,setNotify]=useState('');
  const [text,setText]=useState('');

  useEffect(()=>{
    const existingProfile= {
      name:'name 1',
      number:'9874747474',
    };
    setName(existingProfile.name);   
    setNumber(existingProfile.number);
    setText('');
  },[]);

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log('complaint raised');

    setNotify('complaint raised')
    setTimeout(()=>setNotify(''),5000);
  };

  return (
    <>
    {notify && < Notification message={notify} />}
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
            <textarea
            type='text'
            placeholder='complaint reason'
            value={text}
            rows='3'
            style={{
                backgroundColor:'white',
                color:'black',
            }}

            onChange={(e)=>setText(e.target.value)}
            />

          <button type="submit">
            raise complaint
          </button>

      </form>

    </div>
    </>
  )
}




