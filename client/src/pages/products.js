import React, { useContext, useEffect, useState } from "react";
import ProductsTable from "../components/Products/ProductsTable";
import { AuthContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { checkLoggedIn } from "../api/user";
import { useRouter } from "next/router";
import withAuthentication from "@/components/HOC";

const Products = () => {
  const router = useRouter();

  const { setUser } = useContext(AuthContext);

  const [productsStatus, setproductsStatus] = useState("available");

  useEffect(() => {
    checkLoggedIn()
      .then((res) => {})
      .catch((err) => {
        setUser(null);
        router.push("/login");
      });
  }, []);

  return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-between mt-5 mb-3">
          <h3 className="fw-bold">Products</h3>
          <select
            class="form-select w-auto"
            onChange={(e) => setproductsStatus(e.target.value)}
          >
            <option value="available">Available</option>
            <option value="sold">Sold</option>
          </select>
        </div>
        <div>
          <ProductsTable productsStatus={productsStatus} />
        </div>
      </div>
    </div>
  );
};

export default withAuthentication(Products);
