import React, { useContext, useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { parsePhoneNumber } from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { Country, State, City } from "country-state-city";
import { AuthContext } from "../contexts/UserContext";
import { createOrder } from "../api/order";
import Success from "../components/Checkout/Success";
import useLoading from "../hooks/useLoading";
import { useRouter } from "next/router";

export default function Checkout() {
  const router = useRouter();

  const { setIsLoading } = useLoading();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + "/";

  const { cart, setcart } = useContext(AuthContext);

  const [message, setmessage] = useState("");

  const [value, setValue] = useState(null);
  const [isValid, setIsValid] = useState(null);
  const [apiCalled, setapiCalled] = useState(false);
  let total = 0;

  const [formData, setFormData] = useState({
    city: null,
    postal_code: null,
    address: null,
    country: null,
    state: null,
    first_name: null,
    last_name: null,
    email: null,
    total: 0,
    paymentMethod: "COD",
  });

  //handlers
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleProductChange = (e, index) => {
    const updatedItem = cart.map((car, i) => {
      if (index == i) {
        return {
          ...car,
          quantity: e.target.value <= 0 ? 1 : e.target.value,
        };
      }
      return car;
    });
    setcart(updatedItem);
  };
  //use effect
  useEffect(() => {
    if (value) {
      setIsValid(false);

      if (value.length > 0) {
        if (isValidPhoneNumber(value)) {
          setIsValid(true);

          let countryName = parsePhoneNumber(value);
          if (countryName) {
            let country = Country.getCountryByCode(countryName.country);
            if (country) {
              let state = State.getStatesOfCountry(countryName.country);
              let city = City.getCitiesOfState(
                countryName.country,
                state[0].isoCode
              );
              setFormData({
                ...formData,
                country: country.name,
                state: state[0].isoCode,
                city: city[0].name,
              });
            }
          }
        }
      }
    }
  }, [value]);

  const [orderPlaced, setorderPlaced] = useState(false);
  const [orderId, setorderId] = useState(null);

  //api calls

  const handleSubmit = () => {
    const formdata = new FormData();
    let flag = true;
    for (const [key, value] of Object.entries(formData)) {
      if (key == "email") {
        if (value == null) {
          flag = false;
        } else if (
          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
        ) {
          return;
        }
      } else {
        if (value == null) {
          flag = false;
        } else if (value.length <= 0) {
          flag = false;
        }
      }
    }
    if (!flag || !isValid || cart.length <= 0) {
      if (cart.length <= 0) {
        setmessage("Please Add Items to Cart First");
      } else {
        setmessage("Please Fill All Fields");
      }

      setTimeout(() => {
        setmessage("");
      }, 3000);
    } else {
      let productss = cart.map((p) => {
        return {
          productID: p.product._id,
          quantity: p.quantity,
          price: p.price,
        };
      });

      formdata.append(
        "data",
        JSON.stringify({
          ...formData,
          total: total,
          products: productss,
          name: formData.first_name + " " + formData.last_name,
          phone: value,
        })
      );

      const jsonObject = {};

      for (const [key, value] of formdata.entries()) {
        jsonObject[key] = value;
      }
      setIsLoading(true);
      const data = JSON.parse(jsonObject.data);
      setapiCalled(true);
      createOrder(data)
        .then((res) => {
          setIsLoading(false);
          setorderId(res);
          setorderPlaced(true);
          setapiCalled(false);
          setcart([]);
        })
        .catch((err) => {
          setIsLoading(false);
          setapiCalled(false);
        });
    }
  };

  useEffect(() => {
    if (cart.length <= 0) router.push("/listing");
  }, []);

  return (
    <div>
      {!orderPlaced ? (
        <div className="checkout_container">
          <div className="row m-0">
            <div className="col-md-12 col-lg-12 col-sm-12 p-0">
              <div className="checkout_container_content">
                <div className="checkout-header">
                  <h1>Checkout</h1>
                </div>
                <div className="checkout_center_div">
                  <div className="row m-0">
                    <div className="col-md-6 col-lg-6 col-sm-12 ">
                      {message && (
                        <div
                          class="alert alert-danger my-4 w-50 m-auto text-center"
                          role="alert"
                        >
                          <span className="small">{message}</span>
                        </div>
                      )}
                      <div className="checkout_center_div_left">
                        <div className="checkout_center_div_left_header">
                          <h5 className="mb-4">Address</h5>
                          <div className="row">
                            <div className="col-md-6 col-lg-6 col-sm-12">
                              <div className="checkout_center_div_header_input">
                                <label htmlFor="fname">First Name</label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="fname"
                                  name="first_name"
                                  onChange={handleChange}
                                  value={formData.first_name}
                                  placeholder="First Name"
                                />
                              </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-sm-12">
                              <div className="checkout_center_div_header_input">
                                <label htmlFor="fname">Last Name</label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="fname"
                                  name="last_name"
                                  onChange={handleChange}
                                  value={formData.last_name}
                                  placeholder="Last Name"
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
                                  id="fname"
                                  name="email"
                                  onChange={handleChange}
                                  value={formData.email}
                                  placeholder="Email Address"
                                />
                              </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-sm-12">
                              <div className="checkout_center_div_header_input">
                                <label htmlFor="fname">Phone</label>
                                <PhoneInput
                                  placeholder="Enter phone number"
                                  defaultCountry="US"
                                  value={value}
                                  onChange={setValue}
                                />
                                {isValid == false ? (
                                  <small style={{ color: "red" }}>
                                    Enter a valid phone number
                                  </small>
                                ) : null}
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
                                  id="fname"
                                  name="address"
                                  value={formData.address}
                                  onChange={handleChange}
                                  placeholder="Street Address"
                                />
                              </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-sm-12">
                              <div className="checkout_center_div_header_input">
                                <label htmlFor="fname">State/Province</label>
                                <select
                                  name="state"
                                  onChange={handleChange}
                                  className="form-control"
                                  id="city"
                                >
                                  {isValid && value
                                    ? value.length > 0 &&
                                      isValidPhoneNumber(value)
                                      ? State.getStatesOfCountry(
                                          parsePhoneNumber(value).country
                                        ).map((state, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={state.isoCode}
                                            >
                                              {state.name}
                                            </option>
                                          );
                                        })
                                      : null
                                    : null}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 col-lg-6 col-sm-12">
                              <div className="checkout_center_div_header_input">
                                <label htmlFor="fname">Country </label>
                                <select
                                  name="country"
                                  className="form-control"
                                  id="country"
                                  disabled
                                  value={formData.country}
                                  onChange={handleChange}
                                >
                                  {Country.getAllCountries().map(
                                    (country, val, index) => {
                                      return (
                                        <option key={val} value={country.name}>
                                          {country.name}
                                        </option>
                                      );
                                    }
                                  )}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-sm-12">
                              <div className="checkout_center_div_header_input">
                                <label htmlFor="fname">City</label>
                                <select
                                  name="city"
                                  value={formData.city}
                                  onChange={handleChange}
                                  className="form-control"
                                  id="city"
                                >
                                  {isValid && value
                                    ? value.length > 0 &&
                                      isValidPhoneNumber(value)
                                      ? City.getCitiesOfState(
                                          parsePhoneNumber(value).country,
                                          formData.state
                                        ).map((city, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={city.name}
                                            >
                                              {city.name}
                                            </option>
                                          );
                                        })
                                      : null
                                    : null}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 col-lg-6 col-sm-12">
                              <div className="checkout_center_div_header_input">
                                <label htmlFor="fname">Zip/Postal Code</label>
                                <input
                                  className="form-control"
                                  type="number"
                                  value={formData.postal_code}
                                  onChange={handleChange}
                                  id="fname"
                                  name="postal_code"
                                  placeholder="Zip/Postal Code"
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
                        {cart.map((p, i = 0) => {
                          total +=
                            (parseFloat(p.product.price) -
                              parseFloat(p.product.price) *
                                (parseFloat(p.product.discount) / 100)) *
                            p.quantity;
                          total = parseFloat(total.toFixed(2));

                          return (
                            <>
                              <div
                                className="row"
                                style={{ padding: "22px 0px" }}
                              >
                                <div className="col-md-4 col-lg-4 col-sm-12">
                                  <div className="checkout_order_summary_body_img">
                                    <img
                                      src={baseUrl + p.product.images[0]}
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div className="col-md-4 col-lg-4 col-sm-12">
                                  <div className="checkout_order_summary_body_img ">
                                    <p>{p.product.description}</p>
                                  </div>
                                </div>
                                <div className="col-md-4 col-lg-4 col-sm-12">
                                  <div
                                    style={{ width: "30% !important" }}
                                    className="checkout_order_summary_body_img checkout_order_summary_body_quantity d-flex flex-column pb-4"
                                  >
                                    <h1>
                                      {p.product.discount > 0 ? (
                                        <span
                                          style={{
                                            textDecoration: "line-through",
                                          }}
                                        >
                                          £{p.product.price}
                                        </span>
                                      ) : null}{" "}
                                      £
                                      {parseFloat(p.product.price) -
                                        parseFloat(p.product.price) *
                                          (parseFloat(p.product.discount) /
                                            100)}{" "}
                                    </h1>
                                    {/* <div className="d-flex justify-content-center align-items-center">
                                      <p>Qty</p>
                                      <input
                                        className="form-control"
                                        style={{ width: "50%" }}
                                        type="number"
                                        name={p._id}
                                        id=""
                                        value={p.quantity}
                                        onChange={(e) =>
                                          handleProductChange(e, i)
                                        }
                                      />
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                              {i + 1 < cart.length ? <hr /> : null}
                            </>
                          );
                        })}
                      </div>
                      <div className="col-md-6 col-lg-6 col-sm-12 align-self-end">
                        <div className="row">
                          <div className="col-md-6 col-lg-6 col-sm-12 pt-3 checkout-sum-border-left">
                            {/* <div className="d-flex justify-content-between">
                              <div className="checkout_order_summary_body_img align-items-end justify-content-start">
                                <p>Delivery Fee</p>
                              </div>
                              <div className="d-flex flex-column justify-content-between">
                                <h5> £{39}</h5>
                                <h5 className="mb-3"> £{total}</h5>
                              </div>
                            </div> */}
                          </div>
                          <div className="col-md-6 col-lg-6 col-sm-12 pt-3 checkout-sum-border-left">
                            <div className="d-flex justify-content-between">
                              <div className="checkout_order_summary_body_img align-items-end justify-content-start">
                                <p>Total to Pay</p>
                              </div>
                              <div className="d-flex flex-column justify-content-between fw-bold">
                                <h5></h5>
                                {/* <h5 className="mb-3"> £{total + 39}</h5> */}
                                <h5 className="mb-3"> £{total}</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-primary d-flex justify-content-center mt-4 pt-2 pb-2"
                  style={{ width: "12%!important", float: "right" }}
                  onClick={handleSubmit}
                  disabled={apiCalled}
                >
                  Place order
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Success orderId={orderId} />
      )}
    </div>
  );
}
