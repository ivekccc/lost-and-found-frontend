import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from '../pages/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register';

// Definicija svih ruta aplikacije na jednom mestu
const appRoutes = [
  <Route element={<PrivateRoute />} key="private">
    <Route path="/" element={<Home />} />
  </Route>,
  <Route path="/login" element={<Login />} key="login" />,
  <Route path="/register" element={<Register />} key="register" />,
  <Route path="*" element={<Navigate to="/" replace />} key="notfound" />,
];

export default appRoutes;
