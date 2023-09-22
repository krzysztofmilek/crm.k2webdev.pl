import React from 'react';
import {  Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoutes() {
console.log("private outes")

    let auth ={'user':localStorage.getItem('user')}
    console.log(auth)
  return (
    auth.user ? <Outlet />: <Navigate to="/login" />
  ) 
}
