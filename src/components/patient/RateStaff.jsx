//Form for patients to rate and provide feedback on staff service

import {useState , useEffect} from 'react'
import Notification from '../common/Notification'

import { Rating } from 'react-simple-star-rating'

export default function RateStaff() {

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [notify,setNotify]=useState('');
    const [rating,setRating]=useState(0);
    const [staff,setStaff]=useState('');
    const [text,setText]=useState('');

    useEffect(()=>{  // it will be fetched form the patient profile later
        const existingprofile={
            name:'example name',
            number:'9876543210',
        };
        setName(existingprofile.name);
        setNumber(existingprofile.number);
        setStaff('');
        setRating(0);
        setText('');
    },[]);

    const handleSubmit =(e)=>{   // we will connect it to backend
        e.preventDefault(); 
        if(!rating || rating === 0){
           alert("Please select a star rating before submitting.");
           return;
        }
        console.log('thankyou for your rating ',{
            name,
            number,
            staff,
            rating,
            text
        });
        setNotify('thankyou for your rating');
        setTimeout(()=>setNotify(''),5000);
    };

  return (
    <>
 {notify && <Notification message = {notify} /> }
    <div className='container'>
        <form onSubmit={handleSubmit} className='form'>
            <input
            type='text'
            placeholder='name of patient'
            value={name}
            required
            onChange={(e)=>setName(e.target.value)}
            /> 
            <input 
            type='tel'
            placeholder='mobile number'
            value={number}
            required
            onChange={(e)=>setNumber(e.target.value)}
            />
            <input 
            type='text'
            placeholder='enter staff name / id'
            value={staff}

            onChange={(e)=>setStaff(e.target.value)}
            />
            <Rating 
            initialValue={rating} 
            onClick={(rate) => setRating(rate)} 
            size={30}
            transition
            fillColor='orange'
            emptyColor='gray'
            />
            <textarea
            type='text'
            placeholder='give your feedback / recomended changes'
            value={text}
            rows='3'
            style={{
                backgroundColor:'white',
                color:'black',
            }}

            onChange={(e)=>setText(e.target.value)}
            />

            <button type='submit'>
                submit
            </button>
        </form>
    </div>
    </>
  );
}
