import { faCross, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal } from "reactstrap";

export default function ZoomModal({ open, imageSrc, onCancel }) {
  return (
    <Modal centered isOpen={open} className="image-modal mx-4 mx-sm-auto">
      <div className="text-end mb-4">
        <FontAwesomeIcon
          icon={faX}
          color="white"
          onClick={onCancel}
          cursor={"pointer"}
          fontWeight={"bold"}
          style={{ height: "25px" }}
        />
        {/* <img src={DeletedCrossIcon} onClick={onCancel} role="button" /> */}
      </div>
      <img
        src={imageSrc}
        className="img-fluid"
        style={{
          margin: "auto",
        }}
      />
    </Modal>
  );
}
