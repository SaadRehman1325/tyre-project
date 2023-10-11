import { getAllBrands } from "@/api/brand";
import AddBrandModal from "@/components/Brands/AddBrandModal";
import BrandTable from "@/components/Brands/BrandTable";
import withAuthentication from "@/components/HOC";
import React, { useEffect, useState } from "react";
import useLoading from "@/hooks/useLoading";
import { checkLoggedIn } from "@/api/user";
import { useRouter } from "next/router";

function Brands() {
  const router = useRouter();
  const { isLoading, setIsLoading } = useLoading();

  const [addBrandModalOpen, setaddBrandModalOpen] = useState(false);
  const [brands, setbrands] = useState([]);

  useEffect(() => {
    checkLoggedIn()
      .then((res) => {})
      .catch((err) => {
        router.route("/login");
      });
  }, []);

  const getBrands = async () => {
    setIsLoading(true);
    getAllBrands()
      .then((res) => {
        setbrands(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div>
      <AddBrandModal
        open={addBrandModalOpen}
        oncancel={() => setaddBrandModalOpen(false)}
        getBrands={getBrands}
      />
      <div className="container">
        <div className="d-flex justify-content-between mt-5 mb-3">
          <h3 className="fw-bold">Products</h3>
          <button
            className="btn btn-primary"
            onClick={() => setaddBrandModalOpen(true)}
          >
            Add New Brand
          </button>
        </div>
        <div>
          <BrandTable brands={brands} getBrands={getBrands} />
        </div>
      </div>
    </div>
  );
}

export default withAuthentication(Brands);
