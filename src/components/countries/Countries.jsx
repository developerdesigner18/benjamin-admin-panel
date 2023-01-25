import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import Navbar from "../navbar/Navbar";
import "./Countries.css";
import EditStatus from "./editStatus/EditStatus";

// import _ from "lodash";
import Pagination from "../pagination/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Countries() {
  const [countryData, setcountryData] = useState([]);
  const [allCountryData, setallCountryData] = useState([]);
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

  const handleSearch = (data) => {
    let filterData = allCountryData.filter((country) => {
      if (country.name.toLowerCase().includes(data.toLowerCase())) {
        return country;
      }
    });
    setcountryData(filterData);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/country/getCountries`, {
        headers: {
          Authorization: `beaere ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setallCountryData(result.data.countriesData);
        setcountryData(result.data.countriesData);
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
        <div className="main-country-table">
          <div className="table-search-box">
            <input
              placeholder="search"
              className="form-control"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <FontAwesomeIcon icon={faSearch} className="sreach-btn" />
          </div>
          <div className="country-table">
            <Table
              bordered
              hover
              responsive
              style={{
                textAlign: "center",
                marginBottom: "0px",
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
                {paginatedData ? (
                  <>
                    {paginatedData.map((country, index) => {
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
                  </>
                ) : null}
              </tbody>
            </Table>
          </div>
          {countryData ? (
            <Pagination
              currentPage={currentPage}
              // pages={pages}
              setcurrentPage={setcurrentPage}
              setpaginatedData={setpaginatedData}
              countryData={countryData}
              pageSize={pageSize}
              setpageSize={setpageSize}
            />
          ) : null}
        </div>

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
  );
}
