import React, { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import { getContactInfo, updateContactInfo } from "../../api/contact";

export default function SocialInfo() {
  const { setIsLoading } = useLoading();

  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");

  const [message, setmessage] = useState("");

  const handleSubmit = () => {
    if (
      address &&
      emailAddress &&
      phoneNumber &&
      facebookLink &&
      youtubeLink &&
      instagramLink
    ) {
      setIsLoading(true);

      updateContactInfo({
        address,
        emailAddress,
        phoneNumber,
        facebookLink,
        youtubeLink,
        instagramLink,
      })
        .then((res) => {
          setIsLoading(false);
          setmessage("Information Updated Successfully");
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getContactInfo()
      .then((res) => {
        setIsLoading(false);
        setEmailAddress(res.emailAddress);
        setPhoneNumber(res.phoneNumber);
        setAddress(res.address);
        setFacebookLink(res.facebookLink);
        setYoutubeLink(res.youtubeLink);
        setInstagramLink(res.instagramLink);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setmessage("");
    }, 2000);
  }, [message]);

  return (
    <div>
      <h2>Social Information</h2>

      <div className="form-group">
        <label htmlFor="emailAddress">Email Address</label>
        <input
          type="email"
          className="form-control"
          id="emailAddress"
          name="emailAddress"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          className="form-control"
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          className="form-control"
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="facebookLink">Facebook Link</label>
        <input
          type="text"
          className="form-control"
          id="facebookLink"
          name="facebookLink"
          value={facebookLink}
          onChange={(e) => setFacebookLink(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="youtubeLink">YouTube Link</label>
        <input
          type="text"
          className="form-control"
          id="youtubeLink"
          name="youtubeLink"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="instagramLink">Instagram Link</label>
        <input
          type="text"
          className="form-control"
          id="instagramLink"
          name="instagramLink"
          value={instagramLink}
          onChange={(e) => setInstagramLink(e.target.value)}
        />
      </div>

      <button className="btn btn-primary mt-4" onClick={handleSubmit}>
        Submit
      </button>
      {message && (
        <div
          class="alert alert-success my-4 w-50 m-auto text-center"
          role="alert"
        >
          <span className="small">{message}</span>
        </div>
      )}
    </div>
  );
}
