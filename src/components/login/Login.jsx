import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const [error, seterror] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (email && values.password) {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/user/signIn`, {
          email: email,
          password: values.password,
        })
        .then((result) => {
          console.log(result, "login=======>");
          localStorage.setItem("token", result.data.token);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          seterror(true);
          seterrorMsg("Your credentials did not match please try again");
        });
    } else {
      seterror(true);
      seterrorMsg("please enter valid email and password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="text-center text-dark mt-1">Login Form</h2>
        <div className="text-center  text-dark">
          Please login to access the coupon administration
        </div>
        <div className="card my-3">
          <form className="card-body cardbody-color p-lg-5">
            <div className="text-center">
              <img
                src="images/logo.png"
                className="img-fluid profile-image-pic img-thumbnail rounded-circle mb-5"
                width="150px"
                alt="profile"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control login-user-name"
                id="email"
                onChange={(e) => setemail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="mb-3">
              <InputGroup>
                <input
                  type={values.showPassword ? "text" : "password"}
                  onChange={handlePasswordChange("password")}
                  value={values.password}
                  placeholder="password"
                  className="form-control login-user-name"
                  id="password"
                  required
                />
                <InputGroup.Text
                  id="basic-addon1"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  className="login-password-icon-box"
                  required
                >
                  {values.showPassword ? (
                    <FontAwesomeIcon
                      icon={faEye}
                      className="login-password-icon"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  )}
                </InputGroup.Text>
              </InputGroup>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-color px-5 mb-5 w-100 login-btn"
                onClick={handleLogin}
              >
                Login
              </button>
              {error ? <p className="login-error-msg">{errorMsg}</p> : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
