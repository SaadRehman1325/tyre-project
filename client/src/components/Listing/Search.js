import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

export default function Search({
  home,
  productsSearchQuery,
  setproductsSearchQuery,
}) {
  // console.log(process.env.NEXT_PUBLIC_BASE_URL);
  const router = useRouter();

  const [width, setwidth] = useState(
    productsSearchQuery?.width ? productsSearchQuery.width : undefined
  );
  const [height, setheight] = useState(
    productsSearchQuery?.height ? productsSearchQuery.height : undefined
  );
  const [diameter, setdiameter] = useState(
    productsSearchQuery?.diameter ? productsSearchQuery.diameter : undefined
  );

  const [isIos, setisIos] = useState(false);

  useEffect(() => {
    if (height == "") setheight(undefined);
    if (width == "") setwidth(undefined);
    if (diameter == "") setdiameter(undefined);
  }, [height, width, diameter]);

  const handleSearchProducts = () => {
    setproductsSearchQuery({ width, height, diameter });
    router.push("/listing");
  };

  function iOS() {
    return (
      [
        "iPad Simulator",
        "iPhone Simulator",
        "iPod Simulator",
        "iPad",
        "iPhone",
        "iPod",
      ].includes(navigator.platform) ||
      // iPad on iOS 13 detection
      (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    );
  }

  useEffect(() => {
    iOS() ? setisIos(true) : setisIos(false);
  }, []);

  return (
    <div className={`${home ? "" : "pro-listing-container"}`}>
      <div class="row m-0">
        <div class="col-md-12 col-lg-12 col-sm-12">
          <div class="landing_innerdiv-listing">
            <div class="landing_inner_header"></div>
            <div class="row d-flex justify-content-center mt-4">
              <div class="tn-configurator_tire">
                <div class="inner-text-holder">
                  <div id="tireConfiguratorText">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlLang="en"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 200 200"
                    >
                      <path
                        id="baseline"
                        fill="transparent"
                        d="M 100, 100 m -75,0 a 75,75 0 0,1 150,0"
                      ></path>
                      <foreignObject x="10" y="10" width="300" height="70">
                        <div xmlns="http://www.w3.org/1999/xhtml">
                          <div
                            className={`d-flex main-inputs-wrapper ${
                              isIos ? "margin-left" : ""
                            }`}
                          >
                            <input
                              value={width}
                              onChange={(e) => setwidth(e.target.value)}
                              className="border-0 rounded form-control form-control-sm width-search text-white"
                              placeholder="Width"
                              type="number"
                              style={{
                                background: "none",
                              }}
                            />
                            <span className="text-white fw-bold search-slash-1">
                              /
                            </span>
                            <input
                              value={height}
                              onChange={(e) => setheight(e.target.value)}
                              className="border-0 rounded form-control form-control-sm height-search text-white"
                              placeholder="Height"
                              type="number"
                              style={{
                                background: "none",
                              }}
                            />
                            <span className="text-white fw-bold search-slash-2">
                              /
                            </span>
                            <input
                              value={diameter}
                              onChange={(e) => setdiameter(e.target.value)}
                              className="border-0 rounded form-control form-control-sm diameter-search text-white"
                              placeholder="Diameter"
                              type="text"
                              style={{
                                background: "none",
                              }}
                            />
                          </div>
                        </div>
                      </foreignObject>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 col-lg-3 mt-4 mx-auto">
              <div class="landing_inner_search">
                <button
                  class="btn btn-primary w-100 text-nowrap px-2"
                  onClick={handleSearchProducts}
                  style={{ height: "42px" }}
                >
                  Search for tyres
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
