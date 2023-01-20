import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import Navbar from "../navbar/Navbar";
// import Table from "../table/Table";
import "./Countries.css";

export default function Countries() {
  const [countryData, setcountryData] = useState([]);

  const columns = [
    {
      Header: "name",
      accessor: "name",
    },
    {
      Header: "dial_code",
      accessor: "dial_code",
    },
    { Header: "status", accessor: "status" },
  ];
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
      <div>
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
          {/* <Table columns={columns} data={countryData} /> */}
        </div>
      </div>
    </div>
  );
}
