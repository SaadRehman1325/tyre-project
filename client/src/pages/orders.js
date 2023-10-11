import React from "react";
import OrdersTable from "../components/orders/OrdersTable";
import withAuthentication from "@/components/HOC";

const Orders = () => {
  return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-between mt-5 mb-3">
          <h3 className="fw-bold">Orders</h3>
        </div>
        <OrdersTable />
      </div>
    </div>
  );
};

export default withAuthentication(Orders);
