import React from 'react'
import LoginPage from './LoginPage';
import { Outlet, Navigate, } from 'react-router'

const ProtectedRoutes = ({roles}) => {

    const isAuthenticated = true;
    const role = 'user';

    if(!isAuthenticated)
        return <Navigate to="/loginPage" />;


    if(!roles.includes(role))
        return <Navigate to='/'/>

  return (
    <>
        <Outlet/>
    </>
  )
}

export default ProtectedRoutes