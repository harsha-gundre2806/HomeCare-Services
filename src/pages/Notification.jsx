// for notifications


import React, { useEffect, useState } from 'react';
import './Notification.css';

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
    <div className="wrapper">
      <div className="notification">
        {message}
      </div>
    </div>
  );
}
