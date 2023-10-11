import React, { useState, useEffect, useContext } from "react";
import { createEnquiry } from "../api/enquiry";
import useLoading from "../hooks/useLoading";
import { getContactInfo } from "../api/contact";
import Link from "next/link";
import Image from "next/image";

const Contact = () => {
  const [emailAddress, setemailAddress] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [address, setaddress] = useState("");
  const [facebookLink, setfacebookLink] = useState("");
  const [youtubeLink, setyoutubeLink] = useState("");
  const [instagramLink, setinstagramLink] = useState("");

  const { setIsLoading } = useLoading();
  const [apiCalled, setapiCalled] = useState(false);
  const [message, setmessage] = useState("");

  const [formData, setFormData] = useState({
    name: null,
    email: null,
    message: null,
    status: "pending",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
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
    if (!flag) {
    } else {
      formdata.append("data", JSON.stringify(formData));

      const jsonObject = {};

      for (const [key, value] of formdata.entries()) {
        jsonObject[key] = value;
      }
      setIsLoading(true);
      const data = JSON.parse(jsonObject.data);
      setapiCalled(true);
      createEnquiry(data)
        .then((res) => {
          setmessage("Message Successfully Sent");
          setTimeout(() => {
            setmessage("");
          }, 2000);
          setIsLoading(false);
          setFormData({ name: "", email: "", message: "", status: "pending" });

          setapiCalled(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setapiCalled(false);
        });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getContactInfo()
      .then((res) => {
        setemailAddress(res.emailAddress);
        setphoneNumber(res.phoneNumber);
        setaddress(res.address);
        setyoutubeLink(res.youtubeLink);
        setfacebookLink(res.facebookLink);
        setinstagramLink(res.instagramLink);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="contactus_container">
        <div className="contactus_content">
          <div className="contactus_topdiv">
            <h2 className="fw-bold text-white mx-2 my-3 mx-md-5 my-md-5">
              Contact us
            </h2>
          </div>
          <div className="contactus_centerdiv">
            <div className="row m-0">
              <div className="col-md-6 col-lg-6 col-sm-12">
                <div className="contactus_leftdiv pl-3 container">
                  <div className="contactus_info">
                    <div className="contactus_info_icon mt-3">
                      <img src="/images/envelope-icon.svg" alt="..." />
                    </div>
                    <div className="contactus_info_text my-2">
                      <h1 className="contactus_info_title">Email Address</h1>
                      <p>{emailAddress}</p>
                    </div>
                  </div>
                  <div className="contactus_info">
                    <div className="contactus_info_icon mt-3">
                      <img src="/images/phone-icon.svg" alt="..." />
                    </div>
                    <div className="contactus_info_text my-2">
                      <h1 className="contactus_info_title">Phone Number</h1>
                      <p>{phoneNumber}</p>
                    </div>
                  </div>
                  <div className="contactus_info">
                    <div className="contactus_info_icon mt-3">
                      <img src="/images/location-icon.svg" alt="..." />
                    </div>
                    <div className="contactus_info_text my-2">
                      <h1 className="contactus_info_title">Address</h1>
                      <p>{address}</p>
                    </div>
                  </div>
                  <div className="contactus_info">
                    <div
                      className="contactus_info_icon mt-3"
                      style={{ marginLeft: "25px" }}
                    ></div>
                    <div className="contactus_info_text">
                      <h1 className="contactus_info_title">Follow us</h1>
                      <div className="contactus_social_logo">
                        <Link
                          target="_blank"
                          href={facebookLink}
                          className="m-0 p-0"
                        >
                          <img src="/images/facebook-icon.svg" alt="..." />
                        </Link>
                        {/* <Link
                          target="_blank"
                          href={youtubeLink}
                          className="m-0 p-0 mx-2"
                        >
                          <img src="/images/youtube-icon.svg" alt="..." />
                        </Link> */}
                        <Link
                          target="_blank"
                          href={instagramLink}
                          className="m-0 p-0 mx-2"
                        >
                          <img src="/images/instagram-icon.svg" alt="..." />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-sm-12 position-relative mb-5 mb-md-0">
                <div className="contactus_rightdiv">
                  <div className="contactus_form">
                    <div className="contactus_form_title">
                      <h1
                        style={{
                          color: "#fff",
                          fontSize: "2rem",
                          fontWeight: "bold",
                        }}
                      >
                        Get in touch with us
                      </h1>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-lg-6 col-sm-12">
                        <div className="contactus_form_input">
                          <label for="name">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-6 col-sm-12">
                        <div className="contactus_form_input">
                          <label for="name">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                          />
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-12 col-sm-12">
                        <div className="contactus_form_input">
                          <label for="name" className="mb-2">
                            Message
                          </label>
                          <textarea
                            type="text"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            cols={30}
                            rows={6}
                            placeholder="Your Message"
                          />
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-12 col-sm-12">
                        <div className="contactus_form_input d-flex align-items-end">
                          <button
                            disabled={apiCalled}
                            className="contactus_form_button btn btn-primary w-25"
                            onClick={handleSubmit}
                          >
                            Send
                          </button>
                        </div>
                        {message && (
                          <div
                            class="alert alert-success mt-4 w-50 m-auto text-center"
                            role="alert"
                          >
                            <span className="small">{message}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="contactus_bottom">
              <div className="row m-0">
                <div className="col-md-12 col-lg-12 col-sm-12 m-0 p-0">
                  <div className="contactus_map bg-dark m-0"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
