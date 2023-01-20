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
    const regex = new RegExp(
      `^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{8,}$`
    );
    if (email && values.password) {
      if (!regex.test(values.password)) {
        console.log("valid pass true");
        seterror(true);
        seterrorMsg(
          "Password must contain small and capital letters,symbols and numbers "
        );
      } else {
        seterror(false);
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/user/signIn`, {
            email: email,
            password: values.password,
          })
          .then((result) => {
            console.log(result, "login=======>");

            localStorage.setItem("token", result.data.token);
            navigate("/home");
          })
          .catch((err) => {
            console.log(err);
            seterror(true);
            seterrorMsg("Your credentials did not match please try again");
          });
      }
    } else {
      seterror(true);
      seterrorMsg("please enter valid email and password");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center text-dark mt-1">Login Form</h2>
          <div className="text-center  text-dark">
            Please login to access the coupon administration
          </div>
          <div className="card my-3">
            <form className="card-body cardbody-color p-lg-5">
              <div className="text-center">
                <img
                  src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
                  className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                  width="200px"
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
    </div>
  );
}

export default Login;
