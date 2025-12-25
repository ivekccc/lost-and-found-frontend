import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';


const PrivateRoute: React.FC = () => {
 const isAuth=useAuth()
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
