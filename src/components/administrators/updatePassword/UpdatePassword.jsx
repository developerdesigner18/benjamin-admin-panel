import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../navbar/Navbar";
import "./UpdatePassword.css";

export default function UpdatePassword() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [password, setpassword] = useState("");
  const [confirmPass, setconfirmPass] = useState("");
  const [err, seterr] = useState(false);
  const [errMsg, seterrMsg] = useState("");

  const handleUpdatePassword = () => {
    if (password && confirmPass) {
      const regex = new RegExp(
        `^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{8,}$`
      );
      if (!regex.test(password)) {
        seterr(true);
        seterrMsg(
          "Password must contain small and capital letters,symbols and numbers "
        );
      } else {
        if (password !== confirmPass) {
          seterr(true);
          seterrMsg("The Password conformation does not match");
        } else {
          seterr(false);
          axios
            .put(`${process.env.REACT_APP_BASE_URL}/user/resetPassword/${id}`, {
              password: password,
            })
            .then(() => {
              console.log("password successfully update");
              navigate("/administrators");
            })
            .catch((err) => {
              console.log("err===>", err);
              seterr(true);
              seterrMsg("somthing went wrong");
            });
        }
      }
    } else {
      seterr(true);
      seterrMsg("please enter password");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="update-password-page">
        <h4 className="weloce-text">Coupon Administrators</h4>
        <br />
        <div>
          <input
            type="password"
            className="form-control update-password-input"
            placeholder="enter password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <input
            type="password"
            className="form-control update-password-input"
            placeholder="conform password"
            onChange={(e) => setconfirmPass(e.target.value)}
          />
          {err ? <p className="confirm-pass-err-msg">{errMsg}</p> : null}
        </div>
        <Button onClick={handleUpdatePassword} type="submit">
          Reset Password
        </Button>
      </div>
    </div>
  );
}
