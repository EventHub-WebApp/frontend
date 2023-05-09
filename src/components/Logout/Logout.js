import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await axios.get('http://localhost:5000/user/logout', {withCredentials:true}); // send a logout request to your backend
      localStorage.removeItem('user'); // remove the user data from local storage
      // update your application state to reflect that the user is no longer logged in
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLogout} disabled={loading}>
      Logout
    </button>
  );
}

export default LogoutButton;
