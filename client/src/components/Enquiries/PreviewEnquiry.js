import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Moment from "react-moment";

const ContactModal = ({ open, onclose, enquiry }) => {
  const { name, email, message, date } = enquiry;

  return (
    <Modal isOpen={open}>
      <ModalHeader>Contact Details</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label className="fw-bold mb-2">Name:</label>
          <p className="form-control">{name}</p>
        </div>
        <div className="form-group">
          <label className="fw-bold mb-2">Email:</label>
          <p className="form-control">{email}</p>
        </div>
        <div className="form-group">
          <label className="fw-bold mb-2">Message:</label>
          <p className="form-control">{message}</p>
        </div>
        <div className="form-group">
          <label className="fw-bold mb-2">Date:</label>
          <p className="form-control">
            <Moment format="hh:mma - DD-MMM-YY">{date}</Moment>
          </p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onclose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ContactModal;
