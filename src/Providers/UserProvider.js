import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function checkCookie(cookieName) {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      // Check if the cookie name matches
      if (cookie.startsWith(`${cookieName}=`)) {
        return true;
      }
    }

    return false;
  }

  const loadCurrentUser = async () => {
    try {
      if (checkCookie("access-token")) {
        const response = await axios.get("http://localhost:5000/user/current-user", {
          withCredentials: true,
        });

        // Store the user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data));
        setUser(response.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if the user data is present in localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      setUser(storedUser);
      setLoading(false);
    } else {
      loadCurrentUser();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {loading ? <div>Loading...</div> : children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
