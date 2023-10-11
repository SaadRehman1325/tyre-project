import { useRouter } from "next/router";
import React from "react";

const Footer = () => {
  const router = useRouter();

  const isHomePage = router.pathname === "/";

  return (
    <div className={`footer_container${isHomePage ? "" : ""}`}>
      <div className="row m-0">
        <div className="col-md-12 col-lg-12 col-sm-12">
          <div className="footer_content ml-4">
            © 2023 Tyre 99, LTD. All rights reserved.{" "}
            <span className="mx-4"> Privacy </span> |{" "}
            <span className="mx-4">Terms</span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
