import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function AddUserModal({
  setaddusertoggle,
  addusertoggle,
  setshowAdduserModal,
}) {
  const [email, setemail] = useState("");
  const handleAdd = () => {
    console.log(email);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/user/adminSignUp`, {
        email: email,
      })
      .then((result) => {
        setaddusertoggle(!addusertoggle);
        setshowAdduserModal(false);
      })
      .catch((err) => {
        console.log("errr===>", err);
      });
  };
  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Add Administrator</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          placeholder="Enter the email"
          className="modal-email-input"
          required
          onChange={(e) => {
            setemail(e.target.value);
          }}
        ></input>
      </Modal.Body>
      <div className="modal-add-btn-box">
        <Button onClick={handleAdd}>Add</Button>
      </div>
    </div>
  );
}
