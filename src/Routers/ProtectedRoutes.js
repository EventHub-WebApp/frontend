import { useContext } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../Providers/UserProvider';
import CreateEvent from '../components/CreateEvent/CreateEvent';

//const { user } = useContext(UserContext);
//<Navigate to="/login" replace />

const ProtectedRoute = () => {
    const  user = JSON.parse(localStorage.getItem('user')); ;
    return (
          user ? <Outlet /> : <Navigate to="/" replace/>
      );

  };
  
  export default ProtectedRoute;
