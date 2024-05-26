import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const PrivateRoute = ({ element }) => {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to="/post" /> : <Navigate to="/login" />;
};

export default PrivateRoute;
