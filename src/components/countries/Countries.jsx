import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import Navbar from "../navbar/Navbar";
import "./Countries.css";
import EditStatus from "./editStatus/EditStatus";

// import _ from "lodash";
import Pagination from "../pagination/Pagination";

export default function Countries() {
  const [countryData, setcountryData] = useState([]);
  const [showModale, setshowModale] = useState(false);
  const [country, setcountry] = useState();
  const [toggle, settoggle] = useState(false);

  const [paginatedData, setpaginatedData] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [pageSize, setpageSize] = useState(10);

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
        setpaginatedData(
          result.data.countriesData.slice(
            (currentPage - 1) * pageSize,
            (currentPage - 1) * pageSize + pageSize
          )
        );
      })
      .catch((err) => {
        console.log("err===>", err);
      });
  }, [toggle, pageSize]);

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
              {paginatedData?.map((country, index) => {
                // const index = (currentPage-1 )* pageSize
                return (
                  <tr key={index}>
                    <td>{(currentPage - 1) * pageSize + 1 + index}</td>
                    <td>{country.name}</td>
                    <td>{country.dial_code}</td>
                    <td
                      onClick={() => {
                        editState(country);
                      }}
                    >
                      <Button
                        variant={
                          country.status === "live"
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

          <Pagination
            currentPage={currentPage}
            // pages={pages}
            setcurrentPage={setcurrentPage}
            setpaginatedData={setpaginatedData}
            countryData={countryData}
            pageSize={pageSize}
            setpageSize={setpageSize}
          />

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
