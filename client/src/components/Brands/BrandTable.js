import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faL } from "@fortawesome/free-solid-svg-icons";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import { deleteBrand } from "@/api/brand";
import EditBrandModal from "./EditBrandModal";

export default function BrandTable({ brands, getBrands }) {
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);
  const [editModalOpen, seteditModalOpen] = useState(false);
  const [brandId, setbrandId] = useState("");

  const handleDeleteBrand = () => {
    deleteBrand({ brandId })
      .then((res) => {
        setbrandId("");
        setdeleteModalOpen(false);
        getBrands();
      })
      .catch((err) => {});
  };

  return (
    <div>
      <ConfirmDeleteModal
        open={deleteModalOpen}
        oncancel={() => setdeleteModalOpen(false)}
        productId={brandId}
        onconfirm={handleDeleteBrand}
        heading={"Delete Brand"}
        text={"Are you sure you want to delete this brand?"}
      />
      {editModalOpen && (
        <EditBrandModal
          open={editModalOpen}
          oncancel={() => seteditModalOpen(false)}
          brandId={brandId}
          getBrands={getBrands}
        />
      )}
      <table class="table">
        <thead className="border-light">
          <tr className="bg-light border-bottom">
            <th scope="col" className="text-center">
              Brand Name
            </th>
            <th scope="col" className="text-center">
              Brand Logo
            </th>
            <th scope="col" className="text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr key={brand._id} className="border-light">
              <td className="text-center">{brand.name}</td>
              <td className="text-center">
                <img
                  src={process.env.NEXT_PUBLIC_BASE_URL + "/" + brand.image}
                  className="product-table-brand-image"
                />
              </td>
              <td className="text-center">
                <div className="d-flex justify-content-center gap-3">
                  <button
                    className="btn btn-light border"
                    onClick={() => {
                      setbrandId(brand._id);
                      setdeleteModalOpen(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button
                    className="btn btn-light border"
                    onClick={() => {
                      setbrandId(brand._id);
                      seteditModalOpen(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
