import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { filterProductsSearch } from "../api/product";
import Pagination from "../components/Listing/Pagination";
import Search from "../components/Home/Search";
import ProductsListing from "../components/Listing/ProductsListing";
import useLoading from "../hooks/useLoading";
import { getAllBrands } from "@/api/brand";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import SearchByName from "@/components/SearchByName";

export default function Listing() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + "/";

  const { setIsLoading } = useLoading();

  const [currentPage, setCurrentPage] = useState(1);

  const { productsSearchQuery, setproductsSearchQuery } =
    useContext(ProductContext);

  const [products, setproducts] = useState([]);
  const [productsCopy, setproductsCopy] = useState([]);

  const [brands, setbrands] = useState([]);
  const [brand, setbrand] = useState("");

  useEffect(() => {
    setIsLoading(true);
    filterProductsSearch({ productsSearchQuery })
      .then((res) => {
        setIsLoading(false);
        setproducts(res);
        setproductsCopy(res);
      })
      .catch((err) => {
        setIsLoading(false);
      });

    if (!productsSearchQuery.brand) {
      setbrand("");
    }
  }, [productsSearchQuery]);

  const pageSize = 8;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const productsToShow = products.slice(startIndex, endIndex);
  const totalPages =
    products.length > 0 ? Math.ceil(products.length / pageSize) : 1;

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    getAllBrands()
      .then((res) => {
        setbrands(res);
      })
      .catch((err) => {});
  }, []);

  const handleUpdateBrand = (index) => {
    if (index > -1) {
      setbrand(brands.find((bran, i) => i == index));
    } else {
      setbrand("");
    }
  };

  const handleNameFilter = (value) => {
    setproducts(
      productsCopy.filter((item) =>
        item["name"]?.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    if (brand) {
      setproductsSearchQuery({ ...productsSearchQuery, brand: brand._id });
    } else {
      setproductsSearchQuery({ ...productsSearchQuery, brand: null });
    }
  }, [brand]);

  return (
    <div>
      <Search />
      <div className="container">
        <div className="mt-4">
          <SearchByName changeHandler={handleNameFilter} />
        </div>
        <div className="d-flex justify-content-between my-4">
          <h3 className="fw-bold">Search Result</h3>
          <p>
            {currentPage} out of {totalPages}
          </p>
        </div>
        {/* <div className="d-flex justify-content-end align-items-center gap-3 mb-3">
          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle
              className="text-start d-flex align-items-center justify-content-between"
              style={{ width: "130px" }}
            >
              {brand ? (
                <div>
                  {brand.image ? (
                    <img src={baseUrl + brand.image} width="65" height="30" />
                  ) : (
                    <p className="m-0">{brand.name}</p>
                  )}
                </div>
              ) : (
                "All Brands"
              )}
              <FontAwesomeIcon icon={faCaretDown} className="mx-2" />
            </DropdownToggle>
            <DropdownMenu className="mt-1 brand-dropdown listing-brand-dropdown">
              <DropdownItem
                onClick={() => handleUpdateBrand(-1)}
                className="p-0 mx-0 text-center my-1"
              >
                <div>
                  <span>All Brands</span>
                </div>
              </DropdownItem>
              <hr className="m-0" />
              {brands.map((brand, index) => (
                <div>
                  <DropdownItem
                    key={brand._id}
                    onClick={() => handleUpdateBrand(index)}
                    className="text-center my-1"
                  >
                    <div>
                      {brand.image ? (
                        <img
                          src={baseUrl + brand.image}
                          width="40"
                          height="20"
                        />
                      ) : (
                        <span className="mx-2">{brand.name}</span>
                      )}
                    </div>
                  </DropdownItem>
                  {index < brands.length - 1 ? <hr className="m-0" /> : ""}
                </div>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div> */}

        <ProductsListing
          productsToShow={productsToShow}
          currentPage={currentPage}
          totalPages={totalPages}
        />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
