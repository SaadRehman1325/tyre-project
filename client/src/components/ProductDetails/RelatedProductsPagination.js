import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

export default function RelatedProductsPagination({
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const visiblePages = 4;

    let startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
    let endPage = Math.min(startPage + visiblePages - 1, totalPages);

    if (endPage - startPage < visiblePages - 1) {
      startPage = Math.max(endPage - visiblePages + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };
  return (
    <nav aria-label="Product Pagination">
      <ul
        className="pagination justify-content-center"
        style={{ border: "none" }}
      >
        <li className={`page-item mx-3`}>
          <button
            className={`page-link page-link-btn rounded border-0 d-flex align-items-center gap-1 ${
              currentPage === 1 ? "disabled" : "text-dark fw-bold"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
        </li>

        <li className={`page-item mx-3`}>
          <button
            className={`page-link page-link-btn rounded border-0 rounded d-flex align-items-center gap-1 ${
              currentPage === totalPages ? "disabled" : "text-dark"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <FontAwesomeIcon icon={faAngleRight} size="sm" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
