import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import { getProductsDimensions } from "@/api/product";
import DimensionsDropdown from "./DimensionsDropdown";

export default function Search() {
  const router = useRouter();

  const isHomePage = router.pathname === "/";

  const { productsSearchQuery, setproductsSearchQuery } =
    useContext(ProductContext);

  const [width, setwidth] = useState(
    productsSearchQuery?.width ? productsSearchQuery.width : ""
  );
  const [height, setheight] = useState(
    productsSearchQuery?.height ? productsSearchQuery.height : ""
  );
  const [diameter, setdiameter] = useState(
    productsSearchQuery?.diameter ? productsSearchQuery.diameter : ""
  );
  const [name, setname] = useState(
    productsSearchQuery?.name ? productsSearchQuery.name : ""
  );
  const [productsDimensions, setproductsDimensions] = useState([]);
  const [showDropdown, setshowDropdown] = useState(false);

  const debounceDelay = 700;

  useEffect(() => {
    setwidth(productsSearchQuery?.width ? productsSearchQuery.width : "");
    setheight(productsSearchQuery?.height ? productsSearchQuery.height : "");
    setdiameter(
      productsSearchQuery?.diameter ? productsSearchQuery.diameter : ""
    );
    setname(productsSearchQuery?.name ? productsSearchQuery.name : "");
  }, [productsSearchQuery]);

  useEffect(() => {
    let timerId;
    const fetchData = () => {
      getProductsDimensions({
        productsSearchQuery: {
          width: width == "" ? undefined : width,
          height: height == "" ? undefined : height,
          diameter: diameter == "" ? undefined : diameter,
        },
      })
        .then((res) => {
          if (res.length == 0) {
            setshowDropdown(false);
          }
          setproductsDimensions(res);
        })
        .catch((err) => {});
    };
    const debounceFetchData = () => {
      clearTimeout(timerId);
      timerId = setTimeout(fetchData, debounceDelay);
    };

    debounceFetchData();

    return () => {
      clearTimeout(timerId);
    };
  }, [height, width, diameter]);

  const handleSearchProducts = () => {
    setproductsSearchQuery({
      width: width == "" ? undefined : width,
      height: height == "" ? undefined : height,
      diameter: diameter == "" ? undefined : diameter,
      name: name == "" ? undefined : name,
      brand: undefined,
    });
    router.push("/listing");
  };

  const handleInputChange = (e) => {
    if (!showDropdown) {
      setshowDropdown(true);
    }

    const { name, value } = e.target;
    if (name === "width") {
      setwidth(value);
    } else if (name === "height") {
      setheight(value);
    } else if (name === "diameter") {
      setdiameter(value);
    }
  };

  const handleFilterReset = () => {
    setproductsSearchQuery({
      width: undefined,
      height: undefined,
      diameter: undefined,
      brand: undefined,
      name: undefined,
    });
    setshowDropdown(false);
  };

  return (
    <div
      className={`${
        isHomePage ? "landing_container" : "pro-listing-container"
      }`}
    >
      <div class="row m-0">
        <div class="col-md-12 col-lg-12 col-sm-12">
          <div
            class={`${
              isHomePage ? "landing_innerdiv" : "landing_innerdiv-listing"
            }`}
          >
            <div class="landing_inner_header">
              <h1 className="text-center text-white fw-bold mt-3">
                Tyre Search
              </h1>
            </div>
            <div>
              <p
                className="text-end small text-white m-0 reset-filters"
                onClick={handleFilterReset}
              >
                Reset Filters
              </p>
            </div>
            <div class={`row position-relative ${isHomePage ? "mt-5" : ""}`}>
              <div className="rounded bg-none d-flex align-items-center">
                <label
                  htmlFor="width"
                  className="form-control border-0 text-white fw-bold bg-transparent form-control-lg search-text-headings mb-0"
                >
                  Width
                </label>

                <label
                  htmlFor="height"
                  className="form-control border-0 text-white fw-bold bg-transparent form-control-lg search-text-headings mb-0"
                >
                  Height
                </label>

                <label
                  htmlFor="diameter"
                  className="form-control border-0 text-white fw-bold bg-transparent form-control-lg search-text-headings mb-0"
                >
                  Diameter
                </label>
              </div>
              <div className="rounded bg-white d-flex align-items-center home-inputs">
                <input
                  type="number"
                  name="width"
                  id="width"
                  value={width}
                  onChange={handleInputChange}
                  className="form-control border-0"
                  onClick={() => setshowDropdown(true)}
                />
                <span className="fw-bold h3">/</span>
                <input
                  value={height}
                  name="height"
                  id="height"
                  onChange={handleInputChange}
                  type="number"
                  className="form-control border-0"
                  onClick={() => setshowDropdown(true)}
                />
                <span className="fw-bold h3">/</span>
                <input
                  type="text"
                  name="diameter"
                  id="diameter"
                  value={diameter}
                  onChange={handleInputChange}
                  className="form-control border-0"
                  onClick={() => setshowDropdown(true)}
                />
              </div>
              {showDropdown && (
                <DimensionsDropdown
                  router={router}
                  setproductsSearchQuery={setproductsSearchQuery}
                  dimensions={productsDimensions}
                  setshowDropdown={setshowDropdown}
                  isHomePage={isHomePage}
                />
              )}
              {/* <div>
                <label
                  htmlFor="name"
                  className="form-control border-0 text-white fw-bold bg-transparent form-control-lg search-text-headings mb-0"
                >
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={handleInputChange}
                  className="form-control border-0"
                />
              </div> */}
              <div
                class={`col-md-12 col-lg-12 col-sm-12 ${
                  isHomePage ? "mt-5" : "mt-4"
                }`}
              >
                <div class="landing_inner_search" style={{ margin: "0px" }}>
                  <button
                    class="btn btn-primary btn-lg w-100"
                    onClick={handleSearchProducts}
                  >
                    Search for tyres
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
