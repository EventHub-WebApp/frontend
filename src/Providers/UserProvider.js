import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext({
  user: null,
  setUser: () => {},
});

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


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      setUser(storedUser);
      setLoading(false);
    } else {
      loadCurrentUser();
    }
  }, []);

  const loadCurrentUser = async () => {
    try {
      if(checkCookie("access-token")){
        const response = await axios.get("http://localhost:5000/user/current-user", {
          withCredentials: true,
        });
        
        localStorage.setItem('user', JSON.stringify(response.data));
        setUser(response.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {loading ? <div>Loading...</div> : children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
