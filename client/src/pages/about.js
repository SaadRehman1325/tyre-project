import React from "react";

export default function About() {
  return (
    <div>
      <div className="aboutus_container">
        <div className="aboutus_content">
          <div className="aboutus_topdiv">
            <h2 className="fw-bold text-white mx-2 my-3 mx-md-5 my-md-5">
              About Us
            </h2>
          </div>
          <div className="aboutus_centerdiv">
            <div className="row m-0">
              <div className="col-md-12 col-lg-12 col-sm-12">
                <div className="aboutus_leftdiv">
                  <h2 className="mb-4 fw-bold">About Company</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Mauris odio pharetra
                    massa nunc non nisl at. Tempor consectetur vitae enim mattis
                    nulla consequat posuere sit. A vestibulum vulputate volutpat
                    et pretium amet amet. Pellentesque nibh nullam morbi sem
                    pellentesque vestibulum. Vitae est egestas lectus neque
                    adipiscing egestas vehicula. Consectetur tincidunt
                    pellentesque enim tincidunt maecenas sagittis. Malesuada
                    laoreet feugiat at pharetra. Lobortis volutpat elementum
                    convallis ac viverra sed. Dignissim eget ut{" "}
                  </p>
                </div>
              </div>
              <div className="col-md-12 col-lg-12 col-sm-12">
                <div className="aboutus_rightdiv">
                  <img
                    src="/images/about-img-1.png"
                    className="h-100 w-100 about-img-1"
                    alt="..."
                    // style={{ width: "400px", height: "200px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
