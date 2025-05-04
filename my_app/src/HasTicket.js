import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export function useHasTicket() {
  const [hasTicket, setHasTicket] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const { userId } = jwtDecode(token);
      fetch(`https://parkpal-tzjr.onrender.com/api/ticket/${userId}`)
        .then(res => res.json())
        .then(data => setHasTicket(data.hasTicket));
    } catch (e) {
      console.error(e);
    }
  }, []);

  return hasTicket;
}
