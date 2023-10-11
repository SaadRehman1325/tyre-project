import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkLoggedIn, login } from "../api/user";
import { AuthContext } from "../contexts/UserContext";
import useLoading from "../hooks/useLoading";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Login() {
  const { setIsLoading } = useLoading();
  const router = useRouter();

  const { setUser } = useContext(AuthContext);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    login({ email, password })
      .then((res) => {
        setIsLoading(false);
        setUser(res.access_token);
        Cookies.set("access_token", res.access_token, { expires: 7 }); // Expires in 7 days
        router.push("/products");
      })
      .catch((err) => {
        setIsLoading(false);
        seterror(true);
        setTimeout(() => {
          seterror(false);
        }, 2000);
      });
  };

  return (
    <div>
      <div className="container login-container">
        <div className="row">
          <div className="col-12 col-sm-8 m-auto col-xl-4">
            <div className="login_form">
              <div className="login_form_header">
                <h3>Login</h3>
                <p>Please Enter your details below</p>
              </div>
              <div className="login_form_body">
                <div className="add_product_input_div">
                  <label htmlFor="email">Email address</label>
                  <input
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                <div className="add_product_input_div">
                  <label htmlFor="password">Password</label>
                  <input
                    value={password}
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                  />
                </div>

                <div className="d-flex justify-content-center w-100 mt-4">
                  <button
                    className="btn btn-primary w-100"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                </div>
                {error && (
                  <div
                    class="alert alert-danger mt-4 w-50 m-auto text-center"
                    role="alert"
                  >
                    <span className="small">Invalid Credentials</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
