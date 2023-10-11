import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AuthContext } from "../contexts/UserContext";
import AddProductModal from "./Products/AddProductModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { checkLoggedIn } from "@/api/user";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const [path, setpath] = useState("/");
  const [loggedIn, setloggedIn] = useState(false);

  const { currentUser, setUser } = useContext(AuthContext);

  useEffect(() => {
    setloggedIn(currentUser);
  }, [currentUser]);

  useEffect(() => {
    setpath(window.location.pathname);
  }, [router.pathname]);

  const [addProductModalOpen, setaddProductModalOpen] = useState(false);

  const handleAddProduct = () => {
    setaddProductModalOpen(true);
  };

  return (
    <div>
      {addProductModalOpen && (
        <AddProductModal
          oncancel={() => setaddProductModalOpen(false)}
          open={addProductModalOpen}
        />
      )}
      <nav class="navbar navbar-expand-lg navbar-light bg-white">
        <div class="container">
          <Link href="/" class="navbar-brand">
            <Image
              src="/images/logo3.webp"
              width={100}
              height={40}
              alt="Logo"
            />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav d-flex justify-content-end w-100">
              <li class={`nav-item`}>
                <Link
                  href="/"
                  class={`nav-link px-2${path == "/" ? " active" : ""}`}
                >
                  HOME
                </Link>
              </li>
              <li class={`nav-item`}>
                <Link
                  href="/listing"
                  class={`nav-link px-2${path == "/listing" ? " active" : ""}`}
                >
                  PRODUCTS
                </Link>
              </li>
              <li class={`nav-item`}>
                <Link
                  href="/about"
                  class={`nav-link px-2${path == "/about" ? " active" : ""}`}
                >
                  ABOUT US
                </Link>
              </li>
              <li class={`nav-item`}>
                <Link
                  href="/contact"
                  class={`nav-link px-2${path == "/contact" ? " active" : ""}`}
                >
                  CONTACT US
                </Link>
              </li>
              {
                loggedIn && (
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle px-2"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="d-inline d-lg-none">Welcome Admin</span>
                      <span className="nav-name-circle d-none d-lg-inline">
                        A
                      </span>
                    </a>
                    <ul
                      class="dropdown-menu py-2 px-2"
                      aria-labelledby="navbarDropdownMenuLink"
                      style={{ left: "-5vw" }}
                    >
                      <li>
                        <button
                          className="btn btn-primary w-100 border-0 mb-2"
                          onClick={handleAddProduct}
                        >
                          Add Product
                        </button>
                        <Link
                          href="/products"
                          class={`nav-link d-flex justify-content-between align-items-center px-2 px-lg-1${
                            path == "/products" ? " active" : " text-dark"
                          }`}
                        >
                          Products
                          <FontAwesomeIcon
                            icon={faChevronRight}
                            size={"sm"}
                            className={`${
                              path == "/products"
                                ? " text-dark"
                                : " text-secondary"
                            }`}
                          />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/brands"
                          class={`nav-link d-flex justify-content-between align-items-center px-2 px-lg-1${
                            path == "/brands" ? " active" : " text-dark"
                          }`}
                        >
                          Brands
                          <FontAwesomeIcon
                            icon={faChevronRight}
                            size={"sm"}
                            className={`${
                              path == "/brands"
                                ? " text-dark"
                                : " text-secondary"
                            }`}
                          />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/enquiries"
                          class={`nav-link d-flex justify-content-between align-items-center px-2 px-lg-1${
                            path == "/enquiries" ? " active" : " text-dark"
                          }`}
                        >
                          Enquiries
                          <FontAwesomeIcon
                            icon={faChevronRight}
                            size={"sm"}
                            className={`${
                              path == "/enquiries"
                                ? " text-dark"
                                : " text-secondary"
                            }`}
                          />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/orders"
                          class={`nav-link d-flex justify-content-between align-items-center px-2 px-lg-1${
                            path == "/orders" ? " active" : " text-dark"
                          }`}
                        >
                          Orders
                          <FontAwesomeIcon
                            icon={faChevronRight}
                            size={"sm"}
                            className={`${
                              path == "/orders"
                                ? " text-dark"
                                : " text-secondary"
                            }`}
                          />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/settings"
                          class={`nav-link d-flex justify-content-between align-items-center px-2 px-lg-1${
                            path == "/settings" ? " active" : " text-dark"
                          }`}
                        >
                          Account Settings
                          <FontAwesomeIcon
                            icon={faChevronRight}
                            size={"sm"}
                            className={`${
                              path == "/settings"
                                ? " text-dark"
                                : " text-secondary"
                            }`}
                          />
                        </Link>
                      </li>
                    </ul>
                  </li>
                )
                // : (
                //   <li class={`nav-item`}>
                //     <Link
                //       href="/login"
                //       class={`nav-link px-2${path == "/login" ? " active" : ""}`}
                //     >
                //       LOGIN
                //     </Link>
                //   </li>
                // )
              }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
