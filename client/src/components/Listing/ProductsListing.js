import useLoading from "@/hooks/useLoading";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Moment from "react-moment";

export default function ProductsListing({ productsToShow }) {
  const { setIsLoading } = useLoading();

  const router = useRouter();

  const { query } = router;

  const handleDetailsNavigate = (productId) => {
    if (!query || query.productId != productId) {
      setIsLoading(true);
      router.push(`/product/${productId}`);
    }
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + "/";

  return (
    <div>
      <div className="mb-5 row">
        {productsToShow.map((product, index) => (
          <div
            key={index}
            className="col-8 m-auto m-sm-0 col-sm-6 col-lg-4 col-xl-3"
          >
            <div className="card px-2 position-relative py-3 my-3">
              <div className="pro-listing-img-wrapper">
                {console.log(baseUrl + product.images[0])}
                <img
                  alt="Product Image"
                  // fill={true}
                  className="pro-listing-img"
                  src={baseUrl + product.images[0]}
                />
              </div>
              <div className="text-center my-2">
                {product.name}
                {/* {product.brand?.image && product.showBrandLogo ? (
                  <img
                    className="pro-listing-logo"
                    src={baseUrl + product.brand.image}
                  />
                ) : (
                  <p className="m-0" style={{ height: "40px" }}>
                    {product.brand?.name}
                  </p>
                )} */}
              </div>
              <div className="text-center">
                <p className="fw-bold small">
                  {product.width} / {product.height} / {product.diameter}
                </p>
                <p className="small">
                  <span className="fw-bold">Price:</span> {"\u00A3"}
                  {product.price}
                </p>
                {/* <p className="small">
                  <span className="fw-bold">Added:</span>{" "}
                  <Moment format="hh:mma - DD-MMM-YY">
                    {product.createdAt}
                  </Moment>
                </p> */}
                {/* <p className="pro-listing-loc small">
                  <span className="fw-bold">Tyre Location:</span>{" "}
                  {product.location}
                </p> */}
              </div>
              <button
                className="btn btn-primary btn-sm w-50 m-auto"
                onClick={() => handleDetailsNavigate(product._id)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
