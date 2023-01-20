import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
    const navigate = useNavigate()
    return (
        <div className='navbar-page'>
            <div>
                <p>logo</p>
            </div>
            <div className='navbar-btn-container'>
                <div onClick={() => { navigate('/administrators') }} className='navbar-btn'>Administrators</div>
                <div onClick={() => { navigate('/countries') }} className='navbar-btn'>Countries</div>
                <div onClick={() => { navigate('/countries') }} className='navbar-btn'>Logout</div>
            </div>
        </div>
    )
}
