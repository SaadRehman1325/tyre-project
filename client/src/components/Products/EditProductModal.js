import React, { useContext, useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faXmark } from "@fortawesome/free-solid-svg-icons";
import { updateProduct } from "../../api/product";
import { getSingleProduct } from "../../api/product";
import useLoading from "../../hooks/useLoading";
import { getAddress } from "@/api/contact";
import { AuthContext } from "@/contexts/UserContext";
import { getAllBrands } from "@/api/brand";
import {
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export default function EditProductModal({
  productId,
  open,
  oncancel,
  getProducts,
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + "/";

  const { setIsLoading } = useLoading();

  const [width, setwidth] = useState(0);
  const [height, setheight] = useState(0);
  const [diameter, setdiameter] = useState("");
  const [name, setname] = useState("");
  const [price, setprice] = useState(0);
  const [location, setlocation] = useState("");

  const [pattern, setpattern] = useState("");
  const [thread, setthread] = useState("");
  const [type, settype] = useState("");
  const [loadIndex, setloadIndex] = useState(0);
  const [speedRating, setspeedRating] = useState("");
  const [category, setcategory] = useState("");
  const [discount, setdiscount] = useState(0);
  const [tradeDepartment, settradeDepartment] = useState("");
  const [showBrandLogo, setshowBrandLogo] = useState(false);

  const [description, setdescription] = useState("");

  const [productImages, setproductImages] = useState([]);

  const [apiCalled, setapiCalled] = useState(false);
  const [createdAt, setcreatedAt] = useState("");

  const [brand, setbrand] = useState("");
  const [brands, setbrands] = useState([]);
  const [brandId, setbrandId] = useState("");

  useEffect(() => {
    if (productId) {
      setIsLoading(true);
      getSingleProduct({ productId })
        .then((res) => {
          setIsLoading(false);
          // setbrandId(res.brand._id);
          setheight(res.height);
          setwidth(res.width);
          setdiameter(res.diameter);
          setname(res.name);
          setprice(res.price);
          setlocation(res.location);
          setpattern(res.pattern);
          setthread(res.thread);
          settype(res.type);
          setloadIndex(res.loadIndex);
          setspeedRating(res.speedRating);
          setcategory(res.category);
          // setdiscount(res.discount);
          settradeDepartment(res.tradeDepartment);
          setdescription(res.description);
          setcreatedAt(res.createdAt);
          setshowBrandLogo(res.showBrandLogo);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  }, [productId]);

  const handleUpdateProduct = () => {
    if (
      width &&
      height &&
      diameter &&
      price > 0
      // && brand
    ) {
      setIsLoading(true);
      setapiCalled(true);
      updateProduct({
        createdAt: new Date(createdAt).getTime(),
        productId,
        height,
        width,
        diameter,
        name,
        price,
        location,
        // pattern,
        thread,
        type,
        loadIndex,
        speedRating,
        category,
        discount: 0,
        // tradeDepartment,
        description,
        showBrandLogo,
        brandId: brand._id,
        productImages,
      })
        .then((res) => {
          setIsLoading(false);
          setapiCalled(false);
          getProducts();
          oncancel();
        })
        .catch((err) => {
          setIsLoading(false);
          setapiCalled(false);
        });
    }
  };

  const handleUpdateBrand = (index) => {
    setbrand(brands.find((bran, i) => i == index));
  };

  // const getBrands = async () => {
  //   setIsLoading(true);
  //   getAllBrands()
  //     .then((res) => {
  //       setIsLoading(false);
  //       setbrands(res);
  //     })
  //     .catch((err) => {
  //       setIsLoading(false);
  //     });
  // };

  // useEffect(() => {
  //   getBrands();
  // }, [open]);

  // useEffect(() => {
  //   if (brands && brandId) {
  //     setbrand(brands.find((bran) => bran._id == brandId));
  //   }
  // }, [brands, brandId]);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <Modal centered isOpen={open} size="lg">
      <div className="px-2 pt-3">
        <div className="d-flex justify-content-between flex-wrap">
          <h3 className="fw-bold">Add Product</h3>
          <div role="button" onClick={oncancel}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
      </div>
      <ModalBody className="mt-0 pt-0 px-0">
        <div className="px-2 mb-3">
          <h5>Primary Details</h5>
          <div>
            <label className="fw-bolder small mb-2 mt-2">
              Product Pictures<span className="required">*</span>
            </label>
            <br />
            <label class="custom-product-image-upload position-relative pb-4">
              {productImages.length > 0
                ? productImages.length + " files chosen"
                : "No file chosen"}
              <label class="custom-product-image-upload-btn btn btn-secondary btn-sm px-5 text-nowrap">
                <input
                  accept="image/*"
                  type="file"
                  multiple
                  onChange={(event) => {
                    setproductImages(event.target.files);
                  }}
                  onClick={(event) => {
                    event.target.value = null;
                  }}
                />
                Choose file
              </label>
            </label>
          </div>
          <div className="d-flex justify-content-between flex-wrap mt-2">
            <div>
              <label className="fw-bolder small mb-2 mt-2">
                Width<span className="required">*</span>
              </label>
              <br />
              <input
                value={width}
                onChange={(e) => setwidth(e.target.value)}
                className="border py-2 px-2 rounded form-control"
                placeholder="add"
                type="number"
              />
            </div>
            <div>
              <label className="fw-bolder small mb-2 mt-2">
                Height<span className="required">*</span>
              </label>
              <br />
              <input
                value={height}
                onChange={(e) => setheight(e.target.value)}
                className="border py-2 px-2 rounded form-control"
                placeholder="add"
                type="number"
              />
            </div>
            <div>
              <label className="fw-bolder small mb-2 mt-2">
                Diameter<span className="required">*</span>
              </label>
              <br />

              <input
                value={diameter}
                onChange={(e) => setdiameter(e.target.value)}
                className="border py-2 px-2 rounded form-control"
                placeholder="add"
                type="text"
              />
            </div>
          </div>
          <div className="d-flex justify-content-between flex-wrap mt-p">
            <div>
              <label className="fw-bolder small mb-2 mt-2">Tyre Name</label>
              <br />
              <input
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="border py-2 px-2 rounded form-control"
                placeholder="add"
                type="text"
              />
            </div>
            <div>
              <label className="fw-bolder small mb-2 mt-2">
                Price<span className="required">*</span>
              </label>
              <br />
              <input
                value={price}
                onChange={(e) => setprice(e.target.value)}
                className="border py-2 px-2 rounded form-control"
                placeholder="add"
                type="number"
              />
            </div>
            <div>
              <label className="fw-bolder small mb-2 mt-2">Tyre Location</label>
              <br />
              <input
                value={location}
                disabled
                className="border py-2 px-2 rounded form-control"
                placeholder="add"
                type="text"
              />
            </div>
          </div>
        </div>
        <hr className="border w-100 mt-4" />
        <div className="px-2">
          <h5>Secondary Details</h5>
          <div className="d-flex justify-content-between flex-wrap mt-p">
            <div>
              <label className="fw-bolder small mb-2 mt-2">Thread</label>
              <br />
              <input
                value={thread}
                onChange={(e) => setthread(e.target.value)}
                className="border py-2 px-2 rounded form-control"
                placeholder="add"
                type="text"
              />
            </div>
            <div>
              <label className="fw-bolder small mb-2 mt-2">Category</label>
              <br />
              <input
                value={category}
                onChange={(e) => setcategory(e.target.value)}
                className="border py-2 px-2 rounded form-control"
                placeholder="add"
                type="text"
              />
            </div>
            <div>
              <label className="fw-bolder small mb-2 mt-2">Tyre Type</label>
              <br />
              <input
                value={type}
                onChange={(e) => settype(e.target.value)}
                className="border py-2 px-2 rounded form-control"
                placeholder="add"
                type="text"
              />
            </div>
          </div>
          <div className="d-flex justify-content-between flex-wrap mt-p">
            <div>
              <label className="fw-bolder small mb-2 mt-2">Load Index</label>
              <br />
              <input
                value={loadIndex}
                onChange={(e) => setloadIndex(e.target.value)}
                className="border py-2 px-2 rounded form-control"
                placeholder="add"
                type="number"
              />
            </div>
            <div>
              <label className="fw-bolder small mb-2 mt-2">Speed Rating</label>
              <br />
              <input
                value={speedRating}
                onChange={(e) => setspeedRating(e.target.value)}
                className="border py-2 px-2 rounded form-control"
                placeholder="add"
                type="text"
              />
            </div>
            <div className="" style={{ flex: 0.5 }}></div>
            {/* <div className="dropdown-width">
              <label className="fw-bolder small mb-2 mt-2">Brand</label>
              <br />
              <div className="position-relative w-100">
                <Dropdown
                  isOpen={dropdownOpen}
                  toggle={toggleDropdown}
                  className="w-100"
                >
                  <DropdownToggle className="w-100 text-start">
                    {brand ? (
                      <div>
                        <img
                          src={baseUrl + brand.image}
                          width="40"
                          height="40"
                        />
                        <span className="mx-2">{brand.name}</span>
                      </div>
                    ) : (
                      "Select a brand"
                    )}
                  </DropdownToggle>
                  <DropdownMenu className="mt-1 brand-dropdown w-100">
                    {brands.map((brand, index) => (
                      <div>
                        <DropdownItem
                          key={brand._id}
                          onClick={() => handleUpdateBrand(index)}
                        >
                          <div>
                            <img
                              src={baseUrl + brand.image}
                              width="40"
                              height="40"
                            />
                            <span className="mx-2">{brand.name}</span>
                          </div>
                        </DropdownItem>
                        <hr />
                      </div>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <div className="d-flex gap-2 mt-1 align-items-center">
                  <input
                    type="checkbox"
                    checked={showBrandLogo}
                    className="form-check-input m-0"
                    style={{ cursor: "pointer" }}
                    onChange={() => setshowBrandLogo(!showBrandLogo)}
                  />
                  <p className="small m-0">Show Brand Logo</p>
                </div>
              </div>
            </div> */}
          </div>
          <div className="d-flex justify-content-between"></div>
          <div>
            <label className="fw-bolder small mb-2 mt-2">
              Tyre Description
            </label>
            <br />
            <textarea
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              className="w-100 border rounded form-control"
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="d-flex justify-content-end border-0 pt-0">
        <button className="btn btn-secondary" onClick={oncancel}>
          Cancel
        </button>
        <button
          className="btn btn-primary"
          onClick={handleUpdateProduct}
          disabled={apiCalled}
        >
          Update Product
        </button>
      </ModalFooter>
    </Modal>
  );
}
