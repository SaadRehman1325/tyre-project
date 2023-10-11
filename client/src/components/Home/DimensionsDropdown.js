import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faL, faX } from "@fortawesome/free-solid-svg-icons";

export default function DimensionsDropdown({
  dimensions,
  setshowDropdown,
  isHomePage,
  setproductsSearchQuery,
  router,
}) {
  const handleSearchDim = (width, height, diameter) => {
    setproductsSearchQuery({ width, height, diameter });
    setshowDropdown(false);
    router.push("/listing");
  };

  return (
    <div
      className={`position-absolute m-0 p-0 w-100 dim-search-dropdown ${
        isHomePage ? "home" : ""
      } bg-white rounded pt-2`}
    >
      <div className="d-flex align-items-center justify-content-between px-3 mb-2">
        <p className="m-0 small fw-bold">Available Products: </p>
        {/* <FontAwesomeIcon
          icon={faX}
          size="xs"
          role="button"
          onClick={() => setshowDropdown(false)}
        /> */}
        <p
          className="m-0 small dim-close-btn"
          onClick={() => setshowDropdown(false)}
        >
          Hide
        </p>
      </div>
      {dimensions.map((dimension, index) => (
        <div
          key={index}
          className={`d-flex align-items-center gap-4 dim-item py-3 ${
            index != dimensions.length - 1 ? "border-bottom" : ""
          } justify-content-around pb-2`}
          onClick={() =>
            handleSearchDim(
              dimension.width,
              dimension.height,
              dimension.diameter
            )
          }
        >
          <p className="m-0 fw-bold">{dimension.width}W</p>
          <p className="m-0 fw-bold">{dimension.height}H</p>
          <p className="m-0 fw-bold">{dimension.diameter}D</p>
        </div>
      ))}
    </div>
  );
}
