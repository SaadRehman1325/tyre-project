import React from "react";
import PersonalInfo from "../components/Contact/PersonalInfo";
import SocialInfo from "../components/Contact/SocialInfo";
import withAuthentication from "@/components/HOC";

const Settings = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-6">
          <PersonalInfo />
        </div>
        <div className="col-lg-6">
          <SocialInfo />
        </div>
      </div>
    </div>
  );
};

export default withAuthentication(Settings);
