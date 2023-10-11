import React, { useContext, useEffect, useState } from "react";
import { filterProductsSearch, getSingleProduct } from "../../api/product";
import ImageGallery from "../../components/ProductDetails/ImageGallery";
import Moment from "react-moment";
import RelatedProducts from "../../components/ProductDetails/RelatedProducts";
import RelatedProductsPagination from "../../components/ProductDetails/RelatedProductsPagination";
import { AuthContext } from "../../contexts/UserContext";
import useLoading from "../../hooks/useLoading";
import { useRouter } from "next/router";
import Head from "next/head";
import Search from "@/components/Home/Search";
import { ProductContext } from "@/contexts/ProductContext";

export default function ProductDetails({ data }) {
  const { setIsLoading } = useLoading();

  const { productData, relatedProductsData } = data;

  const router = useRouter();

  // const location = useLocation();

  const { cart, setcart } = useContext(AuthContext);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + "/";
  const { productId } = router.query;

  const [product, setproduct] = useState(null);
  const [relatedProducts, setrelatedProducts] = useState([]);

  const currentUrl =
    typeof window === "undefined"
      ? `${process.env.NEXT_PUBLIC_APP_URL}${router.asPath}`
      : `${window.location.origin}${router.asPath}`;

  useEffect(() => {
    setrelatedProducts(
      relatedProductsData.filter((pro) => {
        return pro._id != router.query.productId;
      })
    );
    setIsLoading(false);
    // setproduct(null);
    setproduct(productData);
    window.scrollTo(0, 0);
  }, [router.asPath]);

  // useEffect(() => {
  // }, [productData, relatedProductsData]);

  // useEffect(() => {
  //   // Update the Open Graph metadata dynamically
  //   if (product) {
  //     const helmet = Helmet.peek();
  //     helmet.title = product.name;
  //   }
  // }, [product]);

  const handleAddToCard = () => {
    const finalPrice =
      parseFloat(product.price) -
      parseFloat(product.price) * (parseFloat(product.discount) / 100);
    if (!cart.find((item) => item.product._id == productId)) {
      setcart([
        ...cart,
        {
          quantity: 1,
          price: finalPrice,
          product,
        },
      ]);
    }
    router.push("/cart");
  };

  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages =
    relatedProducts.length > 0
      ? Math.ceil(relatedProducts.length / pageSize)
      : 1;

  const { productsSearchQuery, setprodductsSearchQUery } =
    useContext(ProductContext);

  return (
    // <HelmetProvider>

    <div>
      {console.log(productData)}
      <Head>
        <title>{productData.name}</title>
        <meta property="og:url" content={currentUrl} />
        <meta
          property="og:title"
          content={
            productData.name +
            ` (${productData.width}/${productData.height}/${productData.diameter})`
          }
        />
        <meta property="og:type" content="product" />
        <meta property="og:description" content={productData.description} />
        <meta property="og:image" content={baseUrl + productData.images[0]} />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
        <meta property="og:image:type" content="image/jpeg" />
      </Head>
      <div>
        <div className="mb-5">
          <Search
            productsSearchQuery={productsSearchQuery}
            setproductsSearchQuery={setprodductsSearchQUery}
          />
        </div>
        <div>
          {product ? (
            <div className="container">
              <div>
                <div className="row">
                  <div className="col-8 m-auto col-lg-6 mb-5 mb-lg-0">
                    <div className="card position-relative p-3 listing-card">
                      <ImageGallery images={product.images} />
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="px-3">
                      <div>
                        <h3 className="fw-bold">{product.name}</h3>
                        <p>{product.description}</p>
                        <div className="my-5 d-flex align-items-center gap-3">
                          <h4>Size:</h4>
                          <h4>
                            {product.width} / {product.height} /{" "}
                            {product.diameter}
                          </h4>
                        </div>
                        <div className="row">
                          {/* <div className="col-6">
                            <strong className="">Time and Date: </strong>
                            <span className="">
                              <Moment format="hh:mma - DD-MMM-YY">
                                {product.createdAt}
                              </Moment>
                            </span>
                          </div> */}
                          {/* {(product.brand?.name || product.brand?.logo) && (
                            <div className="col-6">
                              <strong className="text-capitalize">
                                brand:{" "}
                              </strong>
                              {product.brand?.image && product.showBrandLogo ? (
                                <img
                                  style={{
                                    maxWidth: "70px",
                                    objectFit: "contain",
                                    height: "45px",
                                  }}
                                  src={baseUrl + product.brand?.image}
                                />
                              ) : (
                                <span className="">{product.brand?.name}</span>
                              )}
                            </div>
                          )} */}
                          <div className="col-6">
                            <strong className="text-capitalize">price: </strong>
                            <span className="">
                              {"\u00A3"}
                              {product.price}
                            </span>
                          </div>

                          {Object.entries(product).map(([key, value]) => {
                            if (
                              key != "images" &&
                              key != "width" &&
                              key != "height" &&
                              key != "diameter" &&
                              key != "brand" &&
                              key != "_id" &&
                              key != "createdAt" &&
                              key != "price" &&
                              key != "discount" &&
                              key != "description" &&
                              key != "showBrandLogo" &&
                              value != ""
                            ) {
                              return (
                                <div key={key} className="col-6">
                                  <strong className="text-capitalize">
                                    {key}:{" "}
                                  </strong>
                                  <span className="">{value}</span>
                                </div>
                              );
                            }
                          })}
                        </div>
                        <div className="mt-5">
                          <button
                            className="btn btn-primary px-5"
                            onClick={handleAddToCard}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-5">
                <div className="d-flex justify-content-between">
                  <h4 className="fw-bold">Related Tyres</h4>
                  <RelatedProductsPagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
                <RelatedProducts
                  products={relatedProducts}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  pageSize={pageSize}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
    // </HelmetProvider>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { productId } = query;

  let data = {};
  const productData = await getSingleProduct({ productId });
  let relatedProducts = [];
  if (productData.brand) {
    const relatedProductsData = await filterProductsSearch({
      productsSearchQuery: {
        // brand: productData.brand._id,
        height: productData.height,
        width: productData.width,
        diameter: productData.diameter,
      },
    });
    relatedProducts = [...relatedProductsData];
  }
  data = {
    ...data,
    productData: productData,
    relatedProductsData: relatedProducts,
  };

  return {
    props: {
      data,
    },
  };
}
