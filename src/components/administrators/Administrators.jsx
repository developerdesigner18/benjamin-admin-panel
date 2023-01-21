import React, { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import axios from "axios";
import { useEffect } from "react";
import AddUserModal from "./AdduserModal/AddUserModal";
import "./Administrators.css";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";

export default function Administrators() {
  const navigate = useNavigate();
  const [users, setusers] = useState([]);
  const [showAdduserModal, setshowAdduserModal] = useState(false);
  const [addusertoggle, setaddusertoggle] = useState(false);

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
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/user/listAdminUsers`)
      .then((result) => {
        setusers(result.data.adminUsersData);
      });
  }, [addusertoggle]);
  return (
    <>
      <Navbar />
      <div>
        <h4 className="weloce-text">Coupon Administrators</h4>
        <br />
        <div className="administrators-container">
          <Table bordered hover style={{ textAlign: "center" }}>
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
                    <td>{index + 1}</td>
                    <td>{user.email}</td>
                    <td>
                      <Button
                        variant="outline-success"
                        className="administrators-update-btn"
                        onClick={() => navigate(`/updatepassword/${user._id}`)}
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
          <Button onClick={addUser} className="modal-add-btn">
            Add
          </Button>
        </div>
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
