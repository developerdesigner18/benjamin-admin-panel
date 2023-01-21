import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "./EditStatus.css";

export default function EditStatus({
  country,
  toggle,
  settoggle,
  setshowModale,
}) {
  const [status, setstatus] = useState(country.status);
  const [terms, setterms] = useState(country.terms);
  const [showCancelModal, setshowCancelModal] = useState(false);

  const handleCancelModal = () => setshowCancelModal(false);

  const handleSwitch = (value) => {
    if (value) {
      setstatus("live");
    } else {
      setstatus("dormant");
    }
  };

  const handleClose = () => {
    if (status !== country.status || terms !== country.terms) {
      setshowCancelModal(true);
    } else {
      setshowModale(false);
    }
  };
  const handleSave = () => {
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/country/updateCountry`,
        { status: status, terms: terms, _id: country._id },
        {
          headers: {
            Authorization: `beaere ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        settoggle(!toggle);
        setshowModale(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Modal.Header>
        <Modal.Title>Country information</Modal.Title>
        <FontAwesomeIcon icon={faXmark} onClick={handleClose} />
      </Modal.Header>
      <Modal.Body className="country-body">
        <div className="country-modal-row">
          <p>{country.name}</p>
          <p>{country.name}</p>
        </div>
        <hr className="hr-line" />
        <div className="country-modal-row">
          <p>Country Code</p>
          <p>{country.dial_code}</p>
        </div>
        <hr className="hr-line" />
        <div className="country-modal-row">
          <p>Status - {country.status}</p>
          <Form.Check
            type="switch"
            id="custom-switch"
            defaultChecked={country.status === "live" ? true : false}
            onChange={(e) => {
              handleSwitch(e.target.checked);
            }}
          />
        </div>
        <hr className="hr-line" />
        {/* <br /> */}
        <div className="terms-condition">
          <p>National Terms & Conditions</p>
          <textarea
            className="country-text-area"
            onChange={(e) => setterms(e.target.value)}
            defaultValue={terms}
          />
        </div>
        <hr className="hr-line" />
        <div className="country-modal-row">
          <p>WhatsAPP</p>
          <Button onClick={handleSave}>save</Button>
        </div>
        <Modal
          show={showCancelModal}
          onHide={handleCancelModal}
          className="cancel-modal"
          centered
        >
          <Modal.Body>
            <div>
              <h5 className="cancel-heading">Do you want to save Changes</h5>

              <Button
                onClick={handleSave}
                variant="success"
                className="clancel-btn"
              >
                Yes
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => setshowModale(false)}
                className="clancel-btn"
              >
                No
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </Modal.Body>
    </div>
  );
}
