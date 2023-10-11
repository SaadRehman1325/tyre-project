import React from "react";
import EnquiryTable from "../components/Enquiries/EnquriyTable";
import withAuthentication from "@/components/HOC";

const Enquiries = () => {
  return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-between mt-5 mb-3">
          <h3 className="fw-bold">Enquiries</h3>
        </div>
        <EnquiryTable />
      </div>
    </div>
  );
};

export default withAuthentication(Enquiries);
