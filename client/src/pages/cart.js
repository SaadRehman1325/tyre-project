import React, { useContext } from "react";
import { AuthContext } from "../contexts/UserContext";
import { useRouter } from "next/router";

const ShoppingCart = () => {
  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + "/";

  let total = 0;

  const { cart, setcart } = useContext(AuthContext);

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const handleRemoveItem = (item) => {
    const updatedCart = cart.filter((car) => car != item);
    setcart(updatedCart);
  };

  const handleUpdateItem = ({ item, action }) => {
    const updatedItem = cart.map((car) => {
      if (car == item) {
        return {
          ...item,
          quantity: action == "add" ? car.quantity + 1 : car.quantity - 1,
        };
      }
      return item;
    });
    setcart(updatedItem);
  };

  const TableData = cart
    ? cart.map((item, index) => {
        total +=
          (parseFloat(item.product.price) -
            parseFloat(item.product.price) *
              (parseFloat(item.product.discount) / 100)) *
          item.quantity;

        total = parseFloat(total.toFixed(2));

        return (
          <div className="col-md-12 col-lg-12 col-sm-12 p-0">
            <div className="shopping-cart-body-content">
              <div className="row">
                <div className="col-md-4 col-lg-4 col-4 align-self-center">
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="shopping-cart-body-content-img">
                      <img
                        src={baseUrl + item.product.images[0]}
                        alt="product"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-lg-3 col-3">
                  <div className="d-flex">
                    <div className="shopping-cart-body-content-description">
                      <h5>
                        {item.product.discount > 0 ? (
                          <span style={{ textDecoration: "line-through" }}>
                            £{item.product.price}
                          </span>
                        ) : null}{" "}
                        £
                        {(
                          parseFloat(item.product.price) -
                          parseFloat(item.product.price) *
                            (parseFloat(item.product.discount) / 100)
                        ).toFixed(2)}{" "}
                      </h5>
                      <p className="mb-0 fw-bold">{item.product.name}</p>
                      <br />
                      <p className="d-none  d-md-block">
                        {item.product.description}
                      </p>

                      <div
                        className="d-flex align-items-center gap-2 mt-2"
                        onClick={() => handleRemoveItem(item)}
                      >
                        <img
                          src="/images/cross-icon.svg"
                          style={{ height: "16px" }}
                        />
                        {/* <FontAwesomeIcon icon={faXmarkCircle} size="xl" /> */}
                        <p className="m-0 fw-bold">Remove</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-lg-3 col-3 d-flex ">
                  <div className="shopping-cart-body-content-cart-count">
                    <div className="cart_items_div d-flex gap-2 align-items-center mt-2">
                      <p className="m-0">{item.quantity}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 col-lg-2 col-2 d-flex ">
                  <div className="shopping-cart-body-content-cart-count justify-content-center">
                    <div className="cart_items_div">
                      <h5>
                        {" "}
                        £
                        {parseFloat(
                          (parseFloat(item.product.price) -
                            parseFloat(item.product.price) *
                              (parseFloat(item.product.discount) / 100)) *
                            item.quantity
                        ).toFixed(2)}{" "}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })
    : null;
  return (
    <div>
      <div className="shopping_cart_container">
        <div className="row m-0">
          <div className="col-md-12 col-lg-12 col-sm-12 p-0">
            <div className="shopping-cart-header">
              <h1>Shopping Cart</h1>
            </div>
            <div className="shopping-cart-body">
              <div className="row m-0">
                <div className="col-md-12 col-lg-12 col-sm-12 p-0">
                  <div className="shopping-cart-body-header">
                    <div className="row">
                      <div className="col-md-4 col-lg-4 col-4">
                        <h5>Product</h5>
                      </div>
                      <div className="col-md-3 col-lg-3 col-3">
                        <h5>Unit Price</h5>
                      </div>
                      <div className="col-md-3 col-lg-3 col-3">
                        <h5>Quantity</h5>
                      </div>
                      <div className="col-md-2 col-lg-2 col-2 text-center">
                        <h5>Total</h5>
                      </div>
                    </div>
                  </div>
                </div>
                {TableData}
                <div className="col-md-12 col-lg-12 col-sm-12 p-0">
                  <div
                    className="shopping-cart-body-content mb-4"
                    style={{
                      borderBottom: "1px solid #e5e5e5",
                    }}
                  >
                    <div className="row">
                      <div className="col-md-7 col-lg-7 col-sm-12 d-flex align-items-center justify-content-between">
                        {/* <div className="shopping-cart-body-content-shipping">
                          <img
                            src="/images/delivery.svg"
                            style={{ width: "30px" }}
                          />
                          <p>Home Delivery £39</p>
                        </div>
                        <div className="shopping-cart-body-content-shipping justify-content-end pr-5">
                          <h5>£{total + 39}</h5>
                        </div> */}
                      </div>
                      <div className="col-md-5 col-lg-5 col-sm-12 d-flex cart-sum-border-left">
                        <div className="shopping-cart-body-content-shipping">
                          <p>Subtotal {cart.length} items </p>{" "}
                        </div>
                        <div className="shopping-cart-body-content-shipping justify-content-center pr-5 flex-column mx-1">
                          <h5>£{total}</h5>
                          {/* <p className="p-0 m-0">(Excluding delivery)</p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 col-lg-12 col-sm-12 p-0 mb-4">
                  <div
                    className="shopping-cart-body-content"
                    style={{
                      borderBottom: "none",
                    }}
                  >
                    <div className="row">
                      <div className="col-md-12 col-lg-12 col-sm-12 d-flex align-items-center justify-content-center justify-content-sm-between px-5 flex-wrap gap-3">
                        <div className="shopping-cart-shipping-button">
                          <button
                            className="btn btn-transparent border border-dark px-4"
                            onClick={() => {
                              window.history.back();
                            }}
                          >
                            Back to Shopping
                          </button>
                        </div>
                        <div className="shopping-cart-shipping-button">
                          <button
                            className="btn btn-primary p-2 px-4"
                            onClick={handleCheckout}
                            disabled={cart.length <= 0}
                          >
                            Go to Checkout
                          </button>
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
  );
};

export default ShoppingCart;
