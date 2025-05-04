import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export function useHasQueue() {
    const [status, setStatus] = useState({ inQueue: false, gameName: null });
    const token = localStorage.getItem('token');
  
    useEffect(() => {
      if (!token) return;
  
      let userId;
      try {
        const decoded = jwtDecode(token);
        userId = decoded.userId;
      } catch (err) {
        return;
      }
  
      fetch(`https://parkpal-tzjr.onrender.com/api/vq/user/${userId}`)
        .then((res) => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then((data) => {
          setStatus(data);
        })
        .catch(() => {
          setStatus({ inQueue: false, gameName: null });
        });
    }, [token]);
  
    return status;
  }
  