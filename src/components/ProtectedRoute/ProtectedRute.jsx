import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRute({ children }) {
    console.log('helllo');
    if (localStorage.getItem('toen')) {
        console.log('in if');
        return { children }
    }
    else {
        console.log('in else');
        return <Navigate to="/"  ></Navigate>
    }
}
