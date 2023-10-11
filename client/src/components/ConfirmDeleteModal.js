import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function ConfirmDeleteModal({
  oncancel,
  open,
  onconfirm,
  heading,
  text,
}) {
  const handleOnConfirm = () => {
    onconfirm();
  };

  return (
    <div>
      <Modal isOpen={open} centered>
        <ModalHeader>{heading}</ModalHeader>
        <ModalBody>{text}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={oncancel}>
            Cancel
          </Button>
          <Button color="danger" onClick={handleOnConfirm}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
