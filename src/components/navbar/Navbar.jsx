import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navbar-page">
      <div>
        <img src="/images/logo.png" className="navbar-logo" alt="Web-logo" />
      </div>
      <div className="navbar-btn-container">
        <div
          onClick={() => {
            navigate("/administrators");
          }}
          className="navbar-btn"
        >
          Administrators
        </div>
        <div
          onClick={() => {
            navigate("/countries");
          }}
          className="navbar-btn"
        >
          Countries
        </div>
        <div
          onClick={() => {
            navigate("/countries");
          }}
          className="navbar-btn"
        >
          Logout
        </div>
      </div>
    </div>
  );
}
