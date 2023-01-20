import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
// import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navbar-page">
      <div>
        <img src="/images/logo.png" className="navbar-logo" alt="Web-logo" />
      </div>
      {/* <div className="mobile-menu-btn">
        <FontAwesomeIcon icon={faBars} />
      </div> */}
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
            navigate("/login");
            localStorage.removeItem("token");
          }}
          className="navbar-btn"
        >
          Logout
        </div>
      </div>
    </div>
  );
}
