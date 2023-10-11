import React from "react";
import { Modal, ModalBody, Spinner } from "reactstrap";
import useLoading from "../hooks/useLoading";
import Image from "next/image";

export default function LoaderModal() {
  const { isLoading } = useLoading();
  if (!isLoading) {
    return null;
  }

  return (
    <Modal isOpen={true} centered className="loader-modal">
      <ModalBody className="text-center">
        <div className="custom-loader">
          <Image src="/images/loader.gif" width={50} height={50} />
          {/* Add your custom loading icon/component here */}
        </div>
      </ModalBody>
    </Modal>
  );
}
