import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import Navbar from "../navbar/Navbar";
import "./Countries.css";
import EditStatus from "./editStatus/EditStatus";

export default function Countries() {
  const [countryData, setcountryData] = useState([]);
  const [showModale, setshowModale] = useState(false);
  const [country, setcountry] = useState();
  const [toggle, settoggle] = useState(false);

  const editState = (data) => {
    setshowModale(true);
    setcountry(data);
  };

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
  }, [toggle]);
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
                <th>No.</th>
                <th className="header">Country</th>
                <th>International Code</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {countryData.map((country, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{country.name}</td>
                    <td>{country.dial_code}</td>
                    <td
                      onClick={() => {
                        editState(country);
                      }}
                    >
                      <Button
                        variant={
                          country.status == "live"
                            ? "outline-success"
                            : "outline-primary"
                        }
                      >
                        {country.status}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Modal show={showModale} centered>
            <EditStatus
              country={country}
              toggle={toggle}
              settoggle={settoggle}
              setshowModale={setshowModale}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
}
