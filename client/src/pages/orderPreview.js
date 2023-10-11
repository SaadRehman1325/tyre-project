import React, { useContext, useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import { useNavigate, useParams } from "react-router-dom";
import { createOrder, getSingleOrder } from "../api/order";
import withAuthentication from "@/components/HOC";

const OrderPreview = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + "/";

  const { orderId } = useParams();
  const [order, setorder] = useState(null);

  useEffect(() => {
    getSingleOrder({ orderId })
      .then((res) => {
        setorder(res);
      })
      .catch((err) => {});
  }, []);

  return (
    <div>
      {order ? (
        <div className="checkout_container">
          <div className="row m-0">
            <div className="col-md-12 col-lg-12 col-sm-12 p-0">
              <div className="checkout_container_content">
                <div className="checkout-header">
                  <h1>Order Preview</h1>
                </div>
                <div className="checkout_center_div">
                  <div className="row m-0">
                    <div className="col-md-6 col-lg-6 col-sm-12 ">
                      <div className="checkout_center_div_left">
                        <h5 className="mb-5">Order ID: {orderId}</h5>
                        <div className="checkout_center_div_left_header">
                          <h5 className="mb-4">Address</h5>
                          <div className="row">
                            <div className="col-md-6 col-lg-6 col-sm-12">
                              <div className="checkout_center_div_header_input">
                                <label htmlFor="fname">First Name</label>
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="First Name"
                                  disabled
                                  value={order.first_name}
                                />
                              </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-sm-12">
                              <div className="checkout_center_div_header_input">
                                <label htmlFor="fname">Last Name</label>
                                <input
                                  className="form-control"
                                  type="text"
                                  disabled
                                  placeholder="Last Name"
                                  value={order.last_name}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 col-lg-6 col-sm-12">
                              <div className="checkout_center_div_header_input">
                                <label htmlFor="fname">Email Address</label>
                                <input
                                  className="form-control"
                                  type="text"
                                  value={order.email}
                                  disabled
                                  placeholder="Email Address"
                                />
                              </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-sm-12">
                              <div className="checkout_center_div_header_input">
                                <label htmlFor="fname">Phone</label>
                                <input
                                  className="form-control"
                                  type="text"
                                  disabled
                                  value={order.phone}
                                  placeholder="Phone"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 col-lg-6 col-sm-12">
                              <div className="checkout_center_div_header_input">
                                <label htmlFor="fname">Street Address </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="Street Address"
                                  disabled
                                  value={order.address}
                                />
                              </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-sm-12">
                              <div className="checkout_center_div_header_input">
                                <label htmlFor="fname">State/Province</label>
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="State"
                                  disabled
                                  value={order.state}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 col-lg-6 col-sm-12">
                              <div className="checkout_center_div_header_input">
                                <label htmlFor="fname">Country </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="Country"
                                  disabled
                                  value={order.country}
                                />
                              </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-sm-12">
                              <div className="checkout_center_div_header_input">
                                <label htmlFor="fname">City</label>
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="City"
                                  disabled
                                  value={order.city}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 col-lg-6 col-sm-12">
                              <div className="checkout_center_div_header_input">
                                <label htmlFor="fname">Zip/Postal Code</label>
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="Zip"
                                  disabled
                                  value={order.postal_address}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="checkout_order_summary">
                  <div className="checkout_order_summary_header">
                    <h5>Order Summary</h5>
                  </div>
                  <div className="checkout_order_summary_body">
                    <div className="row">
                      <div className="col-md-6 col-lg-6 col-sm-12 checkout-sum-border-right">
                        {order.products.map((p, i = 0) => {
                          return (
                            <>
                              <div
                                className="row"
                                style={{ padding: "22px 0px" }}
                              >
                                <div className="col-md-4 col-lg-4 col-sm-12">
                                  <div className="checkout_order_summary_body_img">
                                    <img
                                      src={baseUrl + p.productID.images[0]}
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div className="col-md-4 col-lg-4 col-sm-12">
                                  <div className="checkout_order_summary_body_img ">
                                    <p>{p.productID.description}</p>
                                  </div>
                                </div>
                                <div className="col-md-4 col-lg-4 col-sm-12">
                                  <div
                                    style={{ width: "30% !important" }}
                                    className="checkout_order_summary_body_img checkout_order_summary_body_quantity d-flex flex-column pb-4"
                                  >
                                    <h1>£{p.price}</h1>
                                    <div className="d-flex justify-content-center align-items-center">
                                      <p>Qty</p>
                                      <input
                                        className="form-control"
                                        style={{ width: "50%" }}
                                        type="number"
                                        disabled
                                        value={p.quantity}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {i + 1 < order.products.length ? <hr /> : null}
                            </>
                          );
                        })}
                      </div>
                      <div className="col-md-6 col-lg-6 col-sm-12 align-self-end">
                        <div className="row">
                          <div
                            className="col-md-6 col-lg-6 col-sm-12 pt-3 checkout-sum-border-left"
                            // style={{ borderLeft: "1px solid #e6e6e6" }}
                          >
                            <div className="d-flex justify-content-between">
                              <div className="checkout_order_summary_body_img align-items-end justify-content-start">
                                <p>Delivery Fee</p>
                              </div>
                              <div className="d-flex flex-column justify-content-between">
                                <h5> £{39}</h5>
                                <h5 className="mb-3"> £{order.total}</h5>
                              </div>
                            </div>
                          </div>
                          <div
                            className="col-md-6 col-lg-6 col-sm-12 pt-3 checkout-sum-border-left"
                            // style={{ borderLeft: "1px solid #e6e6e6" }}
                          >
                            <div className="d-flex justify-content-between">
                              <div className="checkout_order_summary_body_img align-items-end justify-content-start">
                                <p>Total to Pay</p>
                              </div>
                              <div className="d-flex flex-column justify-content-between fw-bold">
                                <h5></h5>
                                <h5 className="mb-3">
                                  {" "}
                                  £{parseFloat(order.total) + 39}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default withAuthentication(OrderPreview);
