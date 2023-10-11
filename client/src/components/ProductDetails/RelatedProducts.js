import React, { useState } from "react";
import ProductsListing from "../Listing/ProductsListing";

export default function RelatedProducts({
  products,
  currentPage,
  pageSize,
  totalPages,
}) {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const productsToShow = products.slice(startIndex, endIndex);

  return (
    <div>
      <div className="container">
        <ProductsListing
          productsToShow={productsToShow}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
