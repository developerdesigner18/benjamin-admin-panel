import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Button, InputGroup } from 'react-bootstrap';
import './login.css'


function Login() {
    const [values, setValues] = useState({
        password: "",
        showPassword: false,
    });
    const [error, seterror] = useState(false)
    const [errorMsg, seterrorMsg] = useState('')

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handlePasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleLogin = () => {
        const regex = new RegExp(`^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{8,}$`)
        if (!regex.test(values.password)) {
            console.log('valid pass true');
            seterror(true)
            seterrorMsg('please enter valid password')
        }
        else {
            seterror(false)
        }

    }

    return (
        <div className='login-page'>
            <h4 className='weloce-text'>Please login to access the coupon administration</h4><br />
            <input placeholder='Username' className='login-user-name' />
            <br /><br />
            <InputGroup >
                <input
                    type={values.showPassword ? "text" : "password"}
                    onChange={handlePasswordChange("password")}
                    value={values.password}
                    placeholder="password"
                    className='login-user-name'
                    required
                />
                <InputGroup.Text
                    id="basic-addon1"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    className="login-password-icon"
                    required
                > {values.showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}</InputGroup.Text>
            </InputGroup>
            <Button className='login-btn' onClick={handleLogin}>Login</Button>
            {
                error ? (<p>{errorMsg}</p>) : null
            }
        </div>
    )
}

export default Login