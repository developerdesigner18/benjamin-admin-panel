import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import Navbar from "../navbar/Navbar";
import "./Countries.css";

export default function Countries() {
  const [countryData, setcountryData] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/country/getCountries`, {
        headers: {
          Authorization: `beaere ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setcountryData(result.data.countriesData);
      })
      .catch((err) => {
        console.log("err===>", err);
      });
  }, []);
  return (
    <div>
      <Navbar />
      <div className="countries-page">
        <h4 className="weloce-text">Country management</h4>
        <br />
        <div className="country-table">
          <Table
            bordered
            hover
            responsive
            style={{
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th>Country</th>
                <th>International Code</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {countryData.map((country, index) => {
                return (
                  <tr key={index}>
                    <td>{country.name}</td>
                    <td>{country.dial_code}</td>
                    <td>{country.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
