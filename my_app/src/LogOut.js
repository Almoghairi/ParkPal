import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function LogoutPage({ setIsLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.info('Logged out successfully!');
    navigate("/home");
  }, []);

  return <p>Logging out...</p>;
}

export default LogoutPage;