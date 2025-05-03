import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutPage({ setIsLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/home");
  }, []);

  return <p>Logging out...</p>;
}

export default LogoutPage;