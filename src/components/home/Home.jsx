import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="home-page">
        <h4 className="weloce-text">
          Welcome to the yucall coupon administration
        </h4>
        <br />
        <Button
          onClick={() => {
            navigate("/administrators");
          }}
          className="home-page-btn"
        >
          Administrators
        </Button>
        <Button
          onClick={() => {
            navigate("/countries");
          }}
          className="home-page-btn"
        >
          Countries
        </Button>
      </div>
    </>
  );
}
