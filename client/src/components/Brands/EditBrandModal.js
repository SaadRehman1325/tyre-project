import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import useLoading from "@/hooks/useLoading";
import { getSingleBrand, updateBrand } from "@/api/brand";

export default function EditBrandModal({ open, oncancel, brandId, getBrands }) {
  const { setIsLoading } = useLoading();

  const [brandname, setbrandname] = useState("");
  const [brandLogo, setbrandLogo] = useState("");
  const [createdAt, setcreatedAt] = useState("");

  const [apiCalled, setapiCalled] = useState(false);

  const handleUpdateBrand = () => {
    setapiCalled(true);
    setIsLoading(true);
    updateBrand({
      brandname,
      createdAt: new Date(createdAt).getTime(),
      brandId,
      brandLogo,
    })
      .then((res) => {
        getBrands();
        setapiCalled(false);
        setIsLoading(false);
        oncancel();
      })
      .catch((err) => {
        setapiCalled(false);
        setIsLoading(false);
        oncancel();
      });
  };

  const getBrand = () => {
    setIsLoading(true);
    getSingleBrand({ brandId })
      .then((res) => {
        setIsLoading(false);
        setbrandname(res.name);
        setcreatedAt(res.createdAt);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getBrand();
  }, [open]);

  return (
    <Modal centered isOpen={open} size="md">
      <div className="px-2 pt-3">
        <div className="d-flex justify-content-between flex-wrap">
          <h3 className="fw-bold">Update Brand</h3>
          <div role="button" onClick={oncancel}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
      </div>
      <ModalBody className="mt-0 pt-0 px-0">
        <div className="px-2 mb-3">
          <h5>Primary Details</h5>
          <div>
            <label className="fw-bolder small mb-2 mt-2">
              Brand Logo<span className="required">*</span>
            </label>
            <br />
            <label class="custom-product-image-upload position-relative pb-4">
              {brandLogo ? brandLogo.name : "No file chosen"}
              <label class="custom-product-image-upload-btn btn btn-secondary btn-sm px-5 text-nowrap">
                <input
                  accept="image/*"
                  type="file"
                  onChange={(event) => {
                    setbrandLogo(event.target.files[0]);
                  }}
                  onClick={(event) => {
                    event.target.value = null;
                  }}
                />
                Choose file
              </label>
            </label>
          </div>
          <div>
            <label className="fw-bolder small mb-2 mt-2">Brand Name</label>
            <input
              value={brandname}
              onChange={(e) => setbrandname(e.target.value)}
              className="border py-2 px-2 rounded form-control"
              placeholder="Brand Name..."
              type="text"
            />
            <br />
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="d-flex justify-content-end border-0 pt-0">
        <button className="btn btn-secondary" onClick={oncancel}>
          Cancel
        </button>
        <button
          className="btn btn-primary"
          onClick={handleUpdateBrand}
          disabled={apiCalled}
        >
          Update Brand
        </button>
      </ModalFooter>
    </Modal>
  );
}
