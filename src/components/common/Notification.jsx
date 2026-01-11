//Toast/popup component for real-time notifications

import React, { useEffect, useState } from 'react';
import '../../styles/Notification.css';

export default function Notification(
    { message = " " } ) 
    {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className='div1'>
      <div className='div2'>
        {message}
      </div>
    </div>
  );
}
