import React, { useEffect, useRef, useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import ZoomModal from "./ZoomModal";

const ImageGallery = ({ images }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + "/";
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomModalOpen, setzoomModalOpen] = useState(false);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [images]);

  return (
    <>
      <ZoomModal
        open={zoomModalOpen}
        onCancel={() => setzoomModalOpen(false)}
        imageSrc={baseUrl + selectedImage}
      />
      <div
        style={{ overflow: "hidden" }}
        onClick={() => setzoomModalOpen(true)}
      >
        <ReactImageMagnify
          {...{
            className: "main-image",
            smallImage: {
              alt: "",
              isFluidWidth: true,
              src: baseUrl + selectedImage,
              height: 1200,
              width: 1800,
            },
            largeImage: {
              src: baseUrl + selectedImage,
              width: 1200,
              height: 1800,
            },
          }}
        />
      </div>
      <div className="thumbnail-images-container bg-light py-1">
        <div className="thumbnail-images w-100">
          {images.map((image, index) => (
            <img
              className="rounded"
              key={index}
              src={baseUrl + image}
              alt={`Image ${index}`}
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageGallery;
