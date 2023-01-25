import React, { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import axios from "axios";
import { useEffect } from "react";
import AddUserModal from "./AdduserModal/AddUserModal";
import "./Administrators.css";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../pagination/Pagination";

export default function Administrators() {
  const navigate = useNavigate();
  const [users, setusers] = useState([]);
  const [allUsers, setallUsers] = useState([]);
  const [showAdduserModal, setshowAdduserModal] = useState(false);
  const [addusertoggle, setaddusertoggle] = useState(false);

  const [paginatedData, setpaginatedData] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [pageSize, setpageSize] = useState(10);

  const handleClose = () => setshowAdduserModal(false);

  const addUser = () => setshowAdduserModal(true);

  const handleDelete = (userID) => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/user/deleteUser/${userID}`)
      .then((result) => {
        setaddusertoggle(!addusertoggle);
      })
      .catch((err) => {
        console.log("err in deleting user", err);
      });
  };

  const handleSearch = (data) => {
    let filterData = allUsers.filter((user) => {
      if (user.email.toLowerCase().includes(data.toLowerCase())) {
        return user;
      }
    });
    setusers(filterData);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/user/listAdminUsers`)
      .then((result) => {
        setusers(result.data.adminUsersData);
        setallUsers(result.data.adminUsersData);
      });
  }, [addusertoggle]);
  return (
    <>
      <Navbar />
      <div>
        <h4 className="weloce-text">Coupon Administrators</h4>
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
              style={{ textAlign: "center", marginBottom: "0px" }}
            >
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Email</th>
                  <th>UpdatePassword</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{(currentPage - 1) * pageSize + 1 + index}</td>
                      <td>{user.email}</td>
                      <td>
                        <Button
                          variant="outline-success"
                          className="administrators-update-btn"
                          onClick={() =>
                            navigate(`/updatepassword/${user._id}`)
                          }
                        >
                          UpdatePassword
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="outline-danger"
                          className="administrators-update-btn"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          {users ? (
            <Pagination
              currentPage={currentPage}
              // pages={pages}
              setcurrentPage={setcurrentPage}
              setpaginatedData={setpaginatedData}
              countryData={users}
              pageSize={pageSize}
              setpageSize={setpageSize}
            />
          ) : null}
        </div>
        <Button onClick={addUser} className="modal-add-btn">
          Add
        </Button>
        <Modal show={showAdduserModal} onHide={handleClose}>
          <AddUserModal
            setaddusertoggle={setaddusertoggle}
            addusertoggle={addusertoggle}
            setshowAdduserModal={setshowAdduserModal}
          />
        </Modal>
      </div>
    </>
  );
}
