import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './home.css'

export default function Home() {
    const navigate = useNavigate()


    return (
        <div className='home-page'>
            <h4 className='weloce-text'>Welcome to the yucall coupon administration</h4><br />
            <Button onClick={() => { navigate('/administrators') }} >Administrators</Button>
            <Button onClick={() => { navigate('/countries') }} >Countries</Button>
        </div>
    )
}
