import React, { useContext, useEffect, useState } from "react";
import Search from "../components/Home/Search";
import { ProductContext } from "../contexts/ProductContext";
import ProductsListing from "@/components/Listing/ProductsListing";
import { getAllProducts } from "@/api/product";
import Pagination from "@/components/Listing/Pagination";
import useLoading from "@/hooks/useLoading";
import SearchByName from "@/components/SearchByName";

export default function Home() {
  const { productsSearchQuery, setproductsSearchQuery } =
    useContext(ProductContext);

  const { setIsLoading } = useLoading();

  const [products, setproducts] = useState([]);
  const [productsCopy, setproductsCopy] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 8;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const productsToShow = products.slice(startIndex, endIndex);
  const totalPages =
    products.length > 0 ? Math.ceil(products.length / pageSize) : 1;

  const handleNameFilter = (value) => {
    setproducts(
      productsCopy.filter((item) =>
        item["name"]?.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    setIsLoading(true);
    getAllProducts()
      .then((res) => {
        setIsLoading(false);
        setproducts(res);
        setproductsCopy(res);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  return (
    // <div className="landing_container">
    <div>
      <Search
        home={true}
        productsSearchQuery={productsSearchQuery}
        setproductsSearchQuery={setproductsSearchQuery}
      />
      <div className="container">
        <div className="mt-4">
          <SearchByName changeHandler={handleNameFilter} />
        </div>

        <div className="d-flex justify-content-between my-4">
          <h3 className="fw-bold">Available Products</h3>
          <p>
            {currentPage} out of {totalPages}
          </p>
        </div>

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
    // </div>
  );
}
