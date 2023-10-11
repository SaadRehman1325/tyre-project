import React from "react";
import { useRouter } from "next/router";

export default function Success({ orderId }) {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/listing");
  };

  return (
    <div className="success-container-wrapper">
      <div className="success-container px-5 text-center py-5">
        <h5 className="fw-bold my-3">Your order has been recieved</h5>
        <img
          src="/images/confirm.svg"
          style={{ height: "43px", width: "auto" }}
        />
        <h5 className="my-4">Thank you for your purchase !</h5>
        <p className="small">Your Order ID is: {orderId}</p>
        <p className="small">
          You will receive an order confirmation call with details of your
          order.
        </p>
        <button className="btn btn-primary" onClick={handleContinue}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
