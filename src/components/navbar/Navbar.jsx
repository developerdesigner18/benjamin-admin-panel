import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navbar-page">
      <div>
        <img src="/images/logo.png" className="navbar-logo" alt="Web-logo" />
      </div>
      <div className="mobile-menu-btn">
        <DropdownButton
          id="dropdown-basic-button"
          title={<FontAwesomeIcon icon={faBars} />}
        >
          <Dropdown.Item onClick={() => navigate("/administrators")}>
            Administrators
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              navigate("/countries");
            }}
          >
            Countries
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              navigate("/login");
              localStorage.removeItem("token");
            }}
          >
            Logout
          </Dropdown.Item>
        </DropdownButton>
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
